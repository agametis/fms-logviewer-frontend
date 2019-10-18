<template>
  <v-app>
    <v-content>
      <Toolbar />
      <LogTabelle />
    </v-content>
    <Footer />
    <BackToTop />
  </v-app>
</template>

<script>
import LogTabelle from "./components/LogTabelle";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default {
  name: "App",
  components: {
    LogTabelle,
    Toolbar,
    BackToTop,
    Footer
  },
  data: () => ({
    //
  })
};
</script>
