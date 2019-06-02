module.exports = async (client, { store }) => {

  client.emit('tikv-status', await store.fetchData('pd.stores'))
  client.emit('tikv-regions', await store.fetchData('pd.regions'))

  return client
}
