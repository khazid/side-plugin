<template>
<div class="row">
    <div class="col-lg-4 col-md-6 col-sm-6 d-lg-block prop-item" v-for="(property, index) in properties" :key="index">
        <div class="card">
            <img
                :src="property.photo"
                class="card-img-top"
                alt="Waterfall"
            />
            <button class="property-heart" @click="saveLike(property.listingId)" :class="{active:isLiked(property.listingId)}"/>
            <div class="card-body">
                <ul class="property-spec">
                    <li>{{property.bedrooms}} BR</li>
                    <li>{{property.bath}} Bath</li>
                    <li>{{property.area}} Sq Ft</li>
                </ul>
                <h5 class="card-price">{{ property.price }}</h5>
                <p class="card-text">{{ property.address }}</p>
                <span class="card-date">Listed: {{ property.listdate }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        properties:{
            type: Array
        },
    },
    data(){
        return {
            likes:[]
        }
    },
    mounted(){
        try {
          if (localStorage.getItem('likes') !== null)
            this.likes = JSON.parse(localStorage.getItem('likes'))

        } catch (error) {
          this.likes = []
          console.log(error)
        }
    },
    
    watch:{
        likes:{
            handler:(value) => {
                value && localStorage.setItem('likes', JSON.stringify(value))
            },
            deep: true
        }
    },
    methods: {
          
          saveLike(id){
              let index = this.likes.findIndex(i => i === id)
              
              index < 0
                ? this.likes.push(id)
                : this.likes.splice(index, 1)

          },
          isLiked(id){
            return this.likes && this.likes.includes(id)
          },
          
      }

}
</script>

<style>

</style>