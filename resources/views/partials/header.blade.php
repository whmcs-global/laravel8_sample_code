
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="#page-top"><img src="{{asset('assets/img/navbar-logo.svg')}}" alt="..." /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars ms-1"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                        <li class="nav-item"><a class="nav-link" href="#portfolio">Portfolio</a></li>
                        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="#team">Team</a></li>
                        <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                    @guest
                        <li class="nav-item"><a class="nav-link" href="#loginFormModal"  data-bs-toggle="modal">Login</a></li>
                        <li class="nav-item"><a class="nav-link" href="#registerFormModal"  data-bs-toggle="modal">Register</a></li>
                    @else
                        @if(Auth::user()->getRoleNames()->first() == 'User')
                            <li class="nav-item"><a href="{{route('userdashboard')}}" class="nav-link">My Account</a></li>
                            <li class="nav-item"><a href="{{ route('logout') }}" class="nav-link">Logout</a></li>
                        @elseif(Auth::user()->getRoleNames()->first() == 'Company')
                            <li class="nav-item"><a href="{{route('companydashboard')}}" class="nav-link">My Account</a></li>
                            <li class="nav-item"><a href="{{ route('logout') }}" class="nav-link">Logout</a></li>
                        @else
                            <li class="nav-item"><a href="{{route('admindashboard')}}" class="nav-link">My Account</a></li>
                            <li class="nav-item"><a href="{{ route('logout') }}" class="nav-link">Logout</a></li>
                        @endif
                    @endguest
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead">
            <div class="container">
                <div class="masthead-subheading">Welcome To Our Studio!</div>
                <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                <a class="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
            </div>
        </header>