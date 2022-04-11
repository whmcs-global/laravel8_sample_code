@extends('user.layouts.cmlayout')
@section('body')
<!-- Begin Page Content -->
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>
    <div class="row">
    </div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Bookings</h1>
    </div>
    <div class="row">
        <div class="col-md-6 mb-4">
             <div class="card shadow mb-4">
                <div class="card-body">
                    <div id="calendar">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('scripts')
 @stop

