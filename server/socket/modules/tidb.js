module.exports = async (client, { store }) => {

  client.emit('allinfo', await store.fetchData('tidb.allinfo'))
  client.emit('status', await store.fetchData('tidb.status'))
  client.emit('regions', await store.fetchData('tidb.regions'))

  return client
}
