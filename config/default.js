module.exports = {
  // Default port
  port: 3000,

  // Default url.
  url: 'http://travelso.me/',

  // Should be disabled in production mode.
  debug: false,

  // Salt key for password hashing.
  salt: '23?h29P$76',

  // Application email (used for registration mail etc).
  email: 'noreply@travelso.me',

  // How long is the password token active.
  resetPasswordExpires: function() {
    return Date.now() + 3600000;
  },

  apiSecret: 'n?RUE6Q)>j=n4^9<Vy.',
  jwtSecret: '/BJEh9b8d(!"HD")',
};