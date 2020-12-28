<template>
  <div>
    <b-form @submit.prevent="saveProduct">
      <b-form-group id="input-group-1" label="Product Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="model.name"
          required
          placeholder="Enter Product Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Product Description" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="model.description"
          required
          placeholder="Enter Product Description"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Product Image" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="model.image"
          required
          placeholder="Enter Product Image URL"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Product Unit" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="model.unit"
          required
          placeholder="Enter Unit of the Product like Kg, per piece etc."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Available Stock" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="model.stock"
          required
          placeholder="Available Stock"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Product Price" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="model.price"
          required
          placeholder="Enter Price per Unit"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled=isLoading>
        <span v-if="isEditing">Update Product</span>
        <span v-else><b-spinner small v-if="isLoading"></b-spinner>Add Product</span>
      </b-button>
    </b-form>
  </div>
</template>

<script>
  // import {
  //   ERROR_MSG
  // } from '../../store/mutation-types'
  export default {
    props: ['model', 'isEditing'],
    data() {
      return {
        isLoading: false
      }
    },
    created () {
    },
    methods: {
      saveProduct () {
        try {
          this.model.price = parseInt(this.model.price)
          this.model.stock = parseFloat(this.model.stock)
          this.isLoading = true
          this.$emit('save-product', this.model)
        } catch (error) {
          console.log('ERROR', error)
        }


        // console.log(this.fields.valid())
        // console.log(this.model)
        
        // this.$validator.validateAll().then(() => {
        //   this.$emit('save-product', this.model)
        // }).catch(() => {
        //   this.$store.commit(ERROR_MSG, {
        //     type: 'error',
        //     title: 'Validation!',
        //     content: 'Please ensure the form is valid.'
        //   })
        // })
      }
    }
  }
</script>
