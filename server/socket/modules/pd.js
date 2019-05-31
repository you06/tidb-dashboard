module.exports = async (client, { store }) => {

  client.emit('pd-bootstrapTime', await store.fetchData('pd.bootstrapTime'))
  client.emit('pd-members', await store.fetchData('pd.members'))

  return client
}
