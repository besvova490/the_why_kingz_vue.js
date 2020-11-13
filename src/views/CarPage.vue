<template>
  <b-container class="bv-example-row">
    <b-row>
       <b-col>
         <h1>Car page</h1>
      </b-col>
    </b-row>
    <b-row>
       <b-col>
         <div>
          <b-card :title="'VIN: ' + car.VIN" :sub-title="'model: ' +  car.model">
            <b-card-text>
              year: {{ car.year }};  color: {{ car.color }}; manufacturer: {{ car.manufacturer }};
            </b-card-text>
          </b-card>
        </div>
       </b-col>
     </b-row>
     <hr>
     <b-row fluid="md">
       <b-col>
         <b-form @submit="onSubmit">
           <b-form-group>
             <b-form-input
               id="input-model"
               v-model='form.model'
               type="text"
               required
               placeholder="Enter car model" >
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
         <b-button type="submit" variant="primary">Update</b-button> |
         <b-button type="reset" variant="danger">Reset</b-button> |
         <b-button v-on:click="delete_car">Delete</b-button>
         </b-form>
       </b-col>
     </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      car: {},
      form: {}
    }
  },
  mounted () {
    axios.get('http://localhost:5000/cars/' + this.$route.params.vin)
      .then(response => (this.car = response.data.item[0], this.form = response.data.item[0], delete this.form['_id'], delete this.form['VIN']))
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('http://127.0.0.1:5000/cars/' + this.$route.params.vin, this.form).then((response) => {
        alert(JSON.stringify(response.data.msg))
      })
    },
    delete_car: function (event) {
      if (event){
        axios.delete('http://127.0.0.1:5000/cars/' + this.$route.params.vin)
        this.$router.push({ path: '/cars' });
      }
    }
  }
}
</script>
