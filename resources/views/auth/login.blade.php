@extends('layouts.app')

@section('content')
        <section class="page-section" id="contact">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Login Form</h2>
                    <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <form class="form" method="POST" action="{{ route('login') }}" id="contactForm">
                    @csrf
                    <!-- .flash-message -->
                    <div class="flash-message"> 
                        @if(session()->has('status'))
                            @if(session()->get('status') == 'Success')
                                <div class="alert alert-success  alert-dismissible">
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> {{ session()->get('message') }}
                                </div>
                            @endif
                            @if(session()->get('status') == 'Error')
                                <div class="alert alert-danger  alert-dismissible">
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> {{ session()->get('message') }}
                                </div>
                            @endif
                        @endif
                    </div>
                    <!--/ end .flash-message -->
                    <div class="row align-items-stretch mb-5">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="email" class="form-control @error('email') is-invalid @enderror" placeholder="Email Address" name="email" value="{{ old('email') }}"  autocomplete="email" autofocus>
                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" name="password">
                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            
                            <div class="text-center"><button class="btn btn-primary btn-xl text-uppercase" id="sign_in" type="submit">LOG IN</button></div>                            
                        </div>                            
                    </div>
                </form> 
            </div>
        </section>
@endsection
@section('scripts')
<!-- /.login-box -->
<script src="{{ asset('frontend/js/jquery.validate.min.js') }}"></script> 
<script>
$( document ).ready(function() {
	$("form[id='contactForm']").validate({
		// Specify validation rules
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
			}
		},
		// Specify validation error messages
		messages: {
			email: {
				required: 'Email address is required',
				email: 'Provide a valid Email address',
			},
			password: {
				required: 'Password is required',
				
			}
		},
		submitHandler: function(form) { 
            var formdata = jQuery("form[id='login_form']");
            var urls = formdata.prop('action');
            jQuery("#sign_in").html('LOG IN <i class="fa fa-spinner fa-spin"></i>');
            jQuery("#sign_in").attr("disabled", true);
            jQuery.ajax({
                type: "POST",
                url: urls,
                data: formdata.serialize(), 
                success:function(data){ 
                    let result = JSON.parse(data);  
                    if (result.success == true)
                    {
                        location.href = result.message;  
                    } else if(result.success == false){
                        jQuery("#status").html('<div class="alert alert-danger  alert-dismissible hidden"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+result.message+'</div>');
                        jQuery("#sign_in").html('LOG IN');
                        jQuery("#sign_in").attr("disabled", false);
                    } 
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    
                    if (jqXHR.status === 302) {
                        swal({
                            title: "Warning",
                            text: "Session timeout!",
                            icon: "warning",
                        });
                        window.location.reload();
                    }
                    else if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        var errors = jQuery.parseJSON(jqXHR.responseText);
                        var erro = '';
                        jQuery.each(errors['errors'], function(n, v) {
                            erro += '<p class="inputerror">' + v + '</p>';
                        });
                        jQuery("#sign_in").html('LOG IN');
                        jQuery("#sign_in").attr("disabled", false);
                        jQuery("#status").html('<div class="alert alert-danger alert-dismissible hidden"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+erro+'</div>');
                        jQuery("#errorsinfo").html(erro);
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    console.info(msg);
                }  
            }); 
		}
	});
});
</script>
@endsection