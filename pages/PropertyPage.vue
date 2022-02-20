<template>
    <div>
        <div class="carousel-item active property-listing">
            <div class="property-listing-title">
                <h3>Property Listings</h3>
            </div>
            <div class="container">
                <div v-if="loading">
                    Loading...
                </div>
                <div v-else>
                    <PropertyOptions
                    :properties="propertyArr"
                    />
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
import PropertyOptions from '../components/PropertyOptions.vue'
import {calcBath,formatPrice,formatDate} from '../helpers/getPropertyOptions'
import axios from "axios"


export default {
    components:{
        PropertyOptions
    },
    data(){
        return {
            loading: true,
            propertyArr:[],
        }
    },
    mounted(){

        this.getProperties()
            
    },
    methods: {
         getData() {
            
            this.loading = true;
            axios.get('https://api.simplyrets.com/properties',{
                headers: {
                    'Authorization': 'Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz'  
                }
            }).then((response)=>{
                let data = response.data
            
                this.propertyArr = data.map(item => ({
                    photo: item.photos[0],
                    bath: calcBath(item.property.bathsFull, item.property.bathsHalf),
                    bedrooms: item.property.bedrooms,
                    area: item.property.area,
                    price: formatPrice(item.listPrice),
                    listdate: formatDate(item.listDate),
                    address: item.address.full,
                    listingId: item.listingId
                }))
                
                this.setDataCache()
                this.loading = false;

            }).catch((err) => console.log(err))

            
            
          },
          setDataCache(){
            localStorage.setItem('properties',JSON.stringify(this.propertyArr));
          },
          getProperties(){
               
               try {
                    if(!localStorage.getItem('properties')) throw new Error('¡No chache!')
                    
                    let data = JSON.parse(localStorage.getItem('properties'));
                    this.propertyArr = data
                    
                    this.loading = false;

               } catch (error) {
                 
                    this.getData()

               }
          }   
          
      }
      
}
</script>