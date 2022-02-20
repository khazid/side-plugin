( function() {
    var vm = new Vue({
      el: document.querySelector('#app'),

      template: `<div>
        <div class="carousel-item active property-listing">
            <div class="property-listing-title">
                <h3>Property Listings</h3>
            </div>
            <div class="container">
                <div v-if="loading">
                    cargando...
                </div>
                <div class="row" v-else>
                    <div class="col-lg-4 d-lg-block prop-item" v-for="(property, index) in properties" :key="index">
                        <div class="card">
                            <img
                                :src="property.photo"
                                class="card-img-top"
                                alt="Waterfall"
                            />
                            <div class="property-heart" ></div>
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
            </div>
        </div>
      </div>`,

      data(){
        return {
            properties: [],
            loading: true
        }
      },

      mounted(){
        this.getData();
      },

      methods: {
          getData() {
            var url = 'https://api.simplyrets.com/properties';
            fetch(url,{
                headers: {
                    'Authorization': 'Basic '+ btoa('simplyrets:simplyrets')  
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                this.properties = data.map(item => ({
                    photo: item.photos[0],
                    bath: item.property.bathsFull,
                    bedrooms: item.property.bedrooms,
                    area: item.property.area,
                    price: item.listPrice,
                    listdate: item.listDate,
                    address: item.address.full,
                    listingId: item.listingId
                }))
                this.loading = false;
             })
          }
      }

    });
})();