import { z } from 'zod';
import { dataUsers, generateToken } from '~/server/libs/auth';

const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const data = LoginBody.parse(body);

    // ini nanti dipindah ke database yah sementara pake array dulu
    const users = dataUsers

    const user = users.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
      throw createError({
        status: 401,
        statusText: "Unauthorized",
      })
    }

    // jangan simpan informasi sensitif di dalam payload token ini, dan jangan lupa harus ada sesuatu yang unique di dalam payload
    const payload = {
      id: user.email, // misalnya id, id harus unique
      email: user.email, // misalnya email, email sudah pasti harus unique, tapi kalo pake db pake id saja
    }
    const token = generateToken(payload);

    // return
    return {
      ok: true,
      data: {
        token, // token untuk user nanti biar disimpan di cookie
        user: {
          // hanya return informasi yang tidak sensitif ke user
          email: user.email,
          name: user.name,
        }
      }
    }
  } catch (error) {
    console.error(error);
    throw createError({
      status: 400,
      statusText: "Bad Request",
    })
  }
});