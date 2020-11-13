
<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <b-form>
          <input v-model="filter.model" placeholder="Model filter"> |
          <input v-model="filter.year" placeholder="Year filter"> |
          <input v-model="filter.color" placeholder="Color filter"> |
          <input v-model="filter.manufacturer" placeholder="Manufacturer filter"> |
          <b-button v-on:click="filter_cars">Filter</b-button> |
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-col>
            <b-button v-on:click="get_all_cars" variant="success">Find All</b-button>
          </b-col>
        </b-form>
      </b-col>
    </b-row>
    <hr>
    <b-row>
       <b-col>
        <b-list-group>
          <b-list-group-item v-for="car in cars" :key="car" :to="'/cars/' + car.VIN" >{{car.VIN}} {{car.model}} {{car.year}} {{car.color}} {{ car.manufacturer }}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <hr>
    <b-row fluid="md">
      <b-col>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input
              id="input-VIN"
              v-model='form.VIN'
              type="text"
              required
              placeholder="Enter VIN">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="input-model"
              v-model='form.model'
              type="text"
              required
              placeholder="Enter car model">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="input-year"
              v-model='form.year'
              type="text"
              required
              placeholder="Enter year">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="input-manufacturer"
              v-model='form.manufacturer'
              type="text"
              required
              placeholder="Enter manufacturer">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="input-color"
              v-model='form.color'
              type="text"
              required
              placeholder="Enter car color">
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button> |
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Cars',
  data () {
  return {
    cars: [],
    form: {
      VIN: '',
      model: '',
      year: '',
      manufacturer: '',
      color: ''
    },
    filter : {
      model: '',
      year: '',
      manufacturer: '',
      color: ''
    }
  }
},
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://127.0.0.1:5000/cars/', this.form).then((response) => {
        alert(JSON.stringify(response.data.msg))
      })
    },
    filter_cars: function (event) {
      if (event){
        axios.get('http://127.0.0.1:5000/cars', {params: this.filter})
        .then(response => (this.cars = response.data.items))
        this.$router.push({ path: '/cars' });
      }
    },
    get_all_cars: function (event) {
      if (event){
        axios.get('http://127.0.0.1:5000/cars')
        .then(response => (this.cars = response.data.items))
        this.$router.push({ path: '/cars' });
      }
    }
  }
}
</script>
