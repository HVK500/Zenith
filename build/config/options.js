module.exports = {
  buildStage: 'production',
  cache: {
    enabled: false,
    lifeTime: {
      // (default: 2 days * 24 * 60 * 60 * 1000) old in milliseconds.
      maxAge: (1 * 24 * 60 * 60 * 1000),
      // (default: 50 MB * 1024 * 1024)
      sizeThreshold: (10 * 1024 * 1024)
    }
  }
}
