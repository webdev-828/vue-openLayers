<template>
    <div id="sidebar">

		<ul>
			<li><a href="#"> <i class="fab fa-accusoft"></i> &nbsp; Config</a></li>
			<li><a href="#"> <i class="fas fa-adjust"></i> &nbsp; Ajustar</a></li>
			<li><a href="#"> <i class="fab fa-audible"></i> &nbsp; Mudar</a></li>
			<li><a href="#"> <i class="fab fa-behance-square"></i> &nbsp; Testar</a></li>
			<li><a href="#"> <i class="fab fa-apple"></i> &nbsp; Apple</a></li>
		</ul>

		<div id="sidebar-btn" v-on:click="exibir()">
			<span></span>
			<span></span>
			<span></span>
		</div>

	</div>
</template>

<script>

import $ from 'jquery'

export default {
    name:'sidebar-menu',
    props:['mostrar'],
    methods:{
        exibir: () => {
            $('#sidebar').toggleClass('visible')
        }
    }
}
</script>

<style>
    @import '../../static/main.css';
    @import url('https://use.fontawesome.com/releases/v5.0.6/css/all.css');;
</style>
