<template>
  <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-card-title>I'm a title</v-card-title>
    <v-card-text>I'm card text</v-card-text>
    <v-card-actions>
   <v-btn class="mx-2" fab dark small outlined  :color="color">
      <v-icon dark>mdi-heart</v-icon>
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'index',
  data() {
	  return {
		  color: 'blue'
	  }
  }
}
</script>
