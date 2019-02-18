<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel 5.5 ReactJS CRUD Example</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('css/site.css')}}" rel="stylesheet" type="text/css">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

</head>
<body>
<div id="header" class="container-fluid">
    <div id="logo" class="pull-left">
        <h1><a href="">Account Book</a></h1>
    </div>
    <nav id="nav-menu-container">
        <ul class="nav-menu">

            <li><a href="">Reports</a></li>
            <li><a href="">Hi</a></li>
            <li>
                <form action="" method="post" id="logoutForm" class="navbar-right">

                    <button type="submit" class="btn btn-link navbar-btn navbar-link">Log out</button>
                </form>
            </li>

            <li><a href="">Log in</a></li>
            <li><a href="">Register</a></li>

        </ul>
    </nav>
</div>
@yield('content')

<!--==========================
  Footeraaa
============================-->
<footer id="footer">
    <div class="footer-top">
        <div class="container">
            <div class="row">

                <div class=" col-md-12 footer-links">
                    <h4>Links</h4>
                    <ul>
                        <li><i class="ion-ios-arrow-right"></i> <a href="#intro">About</a></li>
                        <li><i class="ion-ios-arrow-right"></i> <a href="#portfolio">Projects</a></li>
                        <li><i class="ion-ios-arrow-right"></i> <a href="#contact">Contact</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>


</footer><!-- #footer -->
<script src="{{asset('js/app.js')}}" ></script>
</body>
</html>