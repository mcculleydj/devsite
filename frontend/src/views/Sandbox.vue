<template>
  <v-container fluid>
    <!-- <v-row justify="center" class="mt-12">
      <div class="project" style="transform: rotateY(-60deg) scale(.6)">
        <v-img src="rosetta.png" max-width="250" class="project__image" />
      </div>
      <div class="project" style="transform: rotateY(-30deg) scale(.8)">
        <v-img src="rosetta.png" max-width="250" class="project__image" />
      </div>
      <div class="project">
        <v-img src="rosetta.png" max-width="250" class="project__image" />
      </div>
      <div class="project" style="transform: rotateY(30deg) scale(.8)">
        <v-img src="rosetta.png" max-width="250" class="project__image" />
      </div>
      <div class="project" style="transform: rotateY(60deg) scale(.6)">
        <v-img src="rosetta.png" max-width="250" class="project__image" />
      </div>
    </v-row> -->
    <div style="margin: 500px 500px; display: inline-block">
      <div class="project">
        <v-img src="rosetta.png" max-width="250" class="project__image" />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', e => {
      console.log(e)
    })
  },
}
</script>

<style scoped>
.project {
  display: inline-block;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  position: relative;
  transition: all 0.4s;
  background-color: white;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
}

.project:hover {
  transform: scale(1.4);
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.8);
  filter: brightness(60%);
}

.project__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.project:hover .project__image {
  filter: blur(5px);
}
</style>
