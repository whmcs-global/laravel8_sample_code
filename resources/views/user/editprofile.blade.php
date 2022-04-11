@extends('user.layouts.cmlayout')
@section('body')
<div class="container-fluid">
	<div class="d-sm-flex align-items-center justify-content-between mb-4">
		<h1 class="h3 mb-0 text-gray-800">Update Profile</h1>
	</div>
    <div class="flash-message">
		@if(session()->has('status'))
			@if(session()->get('status') == 'success')
				<div class="alert alert-success  alert-dismissible">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> {{ session()->get('message') }}
				</div>
			@endif
		@endif
	</div>
    <div class="flash-message">
        @if(session()->has('status'))
        @if(session()->get('status') == 'error')
        <div class="alert alert-danger  alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {{ session()->get('message') }}
        </div>
        @endif
        @endif
    </div>
    <!-- end .flash-message -->
    <div class="row mt-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body pt-2 pb-3 manageClinicSection">
                    <h5 class="mt-3 mb-4">
                        Update Profile
                       
                    </h5>
                    <form action="{{route('user.profile-update')}}" method="post" class="user" id="update_profile_form" enctype="multipart/form-data">
                        @csrf
                        <input type="hidden" name="userid" value="@if(Auth::user()){{ $userDetail->id }}@endif">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="form-group">
                                    <label>First Name<span class="required">*</span></label>
                                    <input type="text" name="first_name" id="first_name" value="{{old('first_name',$userDetail->first_name)}}" class="form-control form-control-user"  />
                                    @if ($errors->has('first_name'))
                                    <span class="text-danger">{{ $errors->first('first_name') }}</span>
                                    @endif
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="form-group">
                                    <label>Last Name<span class="required">*</span></label>
                                    <input type="text" name="last_name" id="last_name" value="{{old('last_name',$userDetail->last_name)}}" class="form-control form-control-user"  />
                                    @if ($errors->has('last_name'))
                                    <span class="text-danger">{{ $errors->first('last_name') }}</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="form-group">
                                    <label>Mobile<span class="required">*</span></label>
                                    <input type="number" name="mobile" min="0" minlength="10" maxlength="12" id="mobile" value="{{old('mobile', isset($userDetail->user_detail->mobile) ? $userDetail->user_detail->mobile: "")}}" class="form-control form-control-user"  />
                                    @if ($errors->has('mobile'))
                                        <span class="text-danger">{{ $errors->first('mobile') }}</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="mt-1 mb-1">
                            <div class="text-left d-print-none mt-4">
                                <button type="submit" id="save-membershipplan-btn" class="btn btn-primary">Update Profile</button>
                                <a href="{{route('userdashboard')}}" class="btn btn-light">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- container-fluid -->
@endsection
@section('scripts')
<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script>
    $( document ).ready(function() {
    	$("form[id='update_profile_form']").validate({
    		// Specify validation rules
    		rules: {
                first_name: {
						required: true,
						lettersonly :true
					},
					last_name: {
						required: true,
						lettersonly :true
					},
					mobile: {
						required: true,
						number: true,
                        maxlength: 12,
						minlength: 10,
					},
					
    		},
    		// Specify validation error messages
    		messages: {
    			first_name: {
						required: 'First name is required',
						lettersonly: 'First name should contains letters only',
					},
					last_name: {
						required: 'Last name is required',
						lettersonly: 'Last name should contains letters only',
					},
					email: {
						required: 'Email address is required',
						email: 'Provide a valid email address',
					},
					mobile:{
						required: 'Contact no is required',
						number: 'Contact must be digit only',
                        maxlength: 'Contact no should be of 10 to 12 digit',
						minlength: 'Contact no should be of 10 to 12 digit',
					},
                    country: {						
						lettersonly: 'Country should contains letters only',
					},
                    city: {						
						lettersonly: 'City should contains letters only',
					},
                    zipcode:{
						required: 'Zipcode is required',
						number: 'Zipcode must be number only'
					},
    		},
    		submitHandler: function(form) {
    			form.submit();
    		}
    	});
    });
</script>
@stop