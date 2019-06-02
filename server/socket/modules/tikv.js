module.exports = async (client, { store }) => {

  client.emit('tikv-status', await store.fetchData('pd.stores'))

  return client
}
