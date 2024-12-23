import jwt from 'jsonwebtoken';


// jwt butuh secret key, secrety key ini sangat rahasia, bisa berisi apa saja tapi harus sama terus dipakai
// karena secret key jwt ini ibarat kunci internal kita, jadi setelah dibuat sign token, nanti secret key ini juga dipakai
// untuk validasi juga
const jwtSecret = 'amelcantik1234567890'
// kita bikin expired tokennya juga kapan
const expiresIn = '7d' // 7 hari dalam bentuk milisecond (60 detik * 60 menit * 1000 milisecond * 24 jam * 7 hari)


// ini nanti dipindah ke database yah sementara pake array dulu
export const dataUsers = [
  { email: 'amaliadev@gmail.com', password: 'adminsuper', name: 'Amalia' },
  { email: 'test@mail.com', password: 'password', name: 'Test' },
]


// pangil fungsi ini jika mau generate token
export const generateToken = (payload: any) => {
  // generate token
  const token = jwt.sign(
    {
      ...payload,
      type: "token",
    },
    jwtSecret,
    {
      expiresIn,
    }
  );

  return token;
}

// fungsi ini untuk verify token
export const verifyToken = (token: string) => {
  // verify token
  const payload = jwt.verify(token, jwtSecret);
  if (!payload) return false;
  return payload;
}

export const getUserFromVerifiedTokenInHeader = (headers: {
  authorization?: string;
}) => {
  // get token from headers
  let token = headers.authorization;
  if (!token) {
    return {
      ok: false,
      error: "Unauthorized",
      reason: 'token_not_found'
    }
  }

  // if containts Bearer, remove it
  if (token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "").trim();
  }

  // verify token
  try {
    const payload = verifyToken(token);

    // find user
    const user = dataUsers.find(u => u.email === (payload as any).email);

    if (!user) {
      return {
        ok: false,
        error: "Unauthorized",
        reason: 'user_not_found'
      }
    }

    // return
    return {
      ok: true,
      data: {
        user: {
          email: user.email,
          name: user.name,
        }
      }
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "Unauthorized",
      reason: 'token_invalid'
    }
  }
}