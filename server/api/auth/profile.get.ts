import { z } from 'zod';
import { dataUsers, getUserFromVerifiedTokenInHeader } from '~/server/libs/auth';

const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  // read headers from event
  const headers = event.node.req.headers;

  const { ok, data, error, reason } = getUserFromVerifiedTokenInHeader(headers);
  if (!ok || !data) {
    throw createError({
      status: 401,
      statusText: "Unauthorized",
      statusMessage: reason,
    });
  }

  return {
    ok: true,
    data: {
      user: data.user,
    }
  }

  try {

  } catch (error) {
    console.error(error);
    throw createError({
      status: 400,
      statusText: "Bad Request",
    })
  }
});