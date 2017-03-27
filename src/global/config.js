export default{
  user: {phone: '15216719714', name: null},
  baseURL: 'http://123.56.220.72:8080/Car/api/',
  getToken: function () {
    return localStorage.getItem('token')
  },
  setToken: function (token) {
    localStorage.setItem('token', token)
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('caruser'))
  },
  setUser: function (caruser) {
    localStorage.setItem('caruser', JSON.stringify(caruser))
  },
  getToday: function () {
    var today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    return today
  },
  postHttpData: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    return temp
  },
  postHttpDataWithToken: function (data) {
    var temp = this.postHttpData(data)
    temp.append('token', this.getToken())
    return temp
  },
  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    return temp
  },
  judgeHttpData: function (data) {
    var temp = true
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        return false
      }
    }
    return temp
  }
}
