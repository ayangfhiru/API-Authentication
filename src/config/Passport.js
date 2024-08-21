import 'dotenv/config'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'api/google/callback',
            passReqToCallback: true,
            scope: ['profile'],
        },
        function verify(accessToken, refreshToken, profile, done) {
            return done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

export default passport