import axios from 'axios'

/*
export async function loadById (id) {
  try {
    const url = `http://localhost:3000/products/${id}`
    const { data } = await axios.get(url)
    // commit('setToken', data.idToken)
    // commit('clearMessage', null, { root: true })
    console.log('data', data)
    return data
    // commit('addProduct', data)
  } catch (e) {
    // dispatch('setMessage', {
    //   value: error(e.response.data.error.message),
    //   type: 'danger'
    // }, { root: true })
    // throw new Error()
  }
}
*/

export default axios.create({
  baseURL: process.env.VUE_APP_DBASE
})
