<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Agency - Start Bootstrap Theme</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="{{asset('assets/favicon.ico')}}" />
        <!-- Font Awesome icons (free version)-->
        <script src="https://use.fontawesome.com/releases/v5.15.3/js/all.js" crossorigin="anonymous"></script>
        <!-- Google fonts-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="{{asset('assets/css/styles.css')}}" rel="stylesheet" />
    </head>
    <body id="page-top">
  <!-- Page Content -->
  @include('partials/header')
	
  @yield('content')
  @include('partials/footer')

  <!-- /.container -->

  <!-- Bootstrap core JavaScript -->
@show
    <script src="{{asset('assets/js/jquery-3.5.1.min.js')}}"></script>
<script>
    var baseurl = $('meta[name="baseurl"]').prop('content');
    var token = $('meta[name="csrf-token"]').prop('content');
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="{{asset('assets/js/scripts.js')}}"></script>
  @yield('scripts')
  <script>
  

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[A-Z a-z]+$/i.test(value);
}, "Letters only please");
jQuery.validator.addMethod("letterspaceonly", function(value, element) {
    return this.optional(element) || /^[A-Z a-z]+$/i.test(value);
}, "Letters only please");
  </script>
</body>

</html>