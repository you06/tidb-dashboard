module.exports = async() => {
  return {
    connections: Math.floor(Math.random() * 100),
    version: '5.7.25-TiDB-v3.0.0-rc.1-129-gae58fd01f',
    git_hash: 'ae58fd01f11117c6b8ad3219a825665afa79face'
  }
}
