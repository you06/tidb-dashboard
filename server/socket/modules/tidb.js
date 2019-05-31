module.exports = async (client, { store }) => {

  client.emit('tidb-allinfo', await store.fetchData('tidb.allinfo'))
  client.emit('tidb-status', await store.fetchData('tidb.status'))
  client.emit('tidb-regions', await store.fetchData('tidb.regions'))

  return client
}
