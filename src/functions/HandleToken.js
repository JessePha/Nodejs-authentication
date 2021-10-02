const signToken = (jwt ,userId) => {
    return jwt.sign (
        {
            iss: 'Jesse Pham',
            sub: userId
        },
        process.env.SECRET_KEY,
        {
            expiresIn: 60 * 60 * 24
        }
    )
}

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) token = req.cookies['access-token']
    return token
  }

export default {
    signToken,
    cookieExtractor
}