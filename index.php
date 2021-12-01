<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
	<script src="jquery-latest.min.js"></script>
	<script src='kinematics.js'></script>
	<style>
		body {
			margin:0px;
			padding:0px;
		}
		#centerDot {
			display:inline-block;
			float:left;
			position:absolute;
			height:10px;
			width:10px;
			background-color:#F00;
			border-radius:50%;
		}
		
		#canvas {
			position:absolute;
			left:0px;
			top:0px;
		}
	</style>
</head>

<body>
	<div id="cursorInfo">
		x: <span id="cursorInfoX"></span><br />
		y: <span id="cursorInfoY"></span>
	</div>
	<div id='centerDot'></div>
	<svg id="canvas"></svg>
</body>
</html>