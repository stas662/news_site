<template>
  <div class="wrapper-footer">
    <div class="footer">
      <div class="footer__title">This site</div>
      <ul>
        <li><a href="">Element1</a></li>
        <li><a href="">Element2</a></li>
        <li><a href="">Element3</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-footer {
  margin-top: 10px;
}

a:hover {
  color: #FFF;
}

li {
  list-style: none;
  font-size: 16px;
  line-height: 50px;
  margin-right: 5px;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
}

.footer {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  margin: 0 auto;
}

.footer__title {
  font-size: 18px;
  line-height: 50px;
}

</style>
