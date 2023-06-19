import { ref } from 'vue'
import axios from './axios'

axios.defaults.headers.Authorization = "Bearer " + localStorage.getItem('accessToken')

export default function useApi() {

  const errors = ref('')
  const fileConfig = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  const index = async (endpoint, params) => {
    return await axios.get(endpoint, { params })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        error.message
      });
  }

  const show = async (endpoint, parameter) => {

    return await axios.get(endpoint + '/' + parameter)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.message
      })

  }

  const store = async (endpoint, data, config = false) => {
    errors.value = ''
    return await axios.post(endpoint, data, config ? fileConfig : '')
      .then(function (response) {
        return response.data
      })
      .catch(function (e) {
        if (e.response.status === 422) {
          errors.value = e.response.data.errors
        }
      })
  }

  const update = async (endpoint, parameter, data) => {
    errors.value = ''
    return await axios.put(endpoint + '/' + parameter, data)
      .then(function (response) {
        return response.data
      })
      .catch(function (e) {
        if (e.response.status === 422) {
          errors.value = e.response.data.errors
        }
      })
  }

  // Laravel common put method form-data issue
  // https://stackoverflow.com/questions/74471540/multipart-form-data-not-working-on-axios-put-request
  const laravelFixedUpdate = async (endpoint, parameter, data, config = false) => {
    errors.value = ''
    return await axios.post(endpoint + '/' + parameter, data, config ? fileConfig : '')
      .then(function (response) {
        return response.data
      })
      .catch(function (e) {
        if (e.response.status === 422) {
          errors.value = e.response.data.errors
        }
      })
  }

  const destroy = async (endpoint, parameter) => {
    return await axios.delete(endpoint + '/' + parameter)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.message
      })
  }

  return {
    index,
    show,
    store,
    update,
    destroy,
    errors,
    laravelFixedUpdate
  }

}
