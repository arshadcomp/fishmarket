<template>
  <b-carousel
    id="carousel-1"
    v-model="slide"
    :interval="4000"
    background="#ababab"
    style="text-shadow: 1px 1px 2px #333;"
    :img-height=1080
    :img-width=1920
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <!-- Text slides with image -->
    <b-carousel-slide
      caption="Freshness Ensured"
      text="Directly from Sea to your Plate!"
      img-src="https://source.unsplash.com/cc6kWqOr790/1920x1080"
    ></b-carousel-slide>

    <!-- Slides with custom text -->
    <b-carousel-slide img-src="https://source.unsplash.com/QiT06DDAXVQ/1920x1080">
      <h3>Name: Mahima Nandesh Mumbaikar</h3>
      <h3>Account No: 39874952978</h3>
      <h3>IFSC Code: SBIN0007905</h3>
      <h4>For online payments, please use the account number above and mention the <strong>ORDER ID</strong> and <strong>DATE</strong> in remarks.</h4>
    </b-carousel-slide>

    <!-- Slides with image only -->
    <b-carousel-slide img-src="https://source.unsplash.com/UNefAhXPvf4/1920x1080">
      <h2>Delivery only for Kaiga Township</h2>
    </b-carousel-slide>

    <b-carousel-slide img-src="https://source.unsplash.com/RySd8U4BsUo/1920x1080">
      <h2>Directly from Sea to your Plate!</h2>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>

export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
      // slide = slide + 1;
    },
    onSlideEnd() {
      this.sliding = false;
      // slide = slide + 1;
    }
  }
};
</script>