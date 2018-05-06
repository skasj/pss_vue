<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="module_list">
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import Sidebar from '../components/sidebar.vue'
export default {
  name: 'index',
  components: { Header, Footer, Sidebar }
}
</script>
