<style>
    .hero-image {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(<?php echo BASE_PATH . '/public/icons/dmitry-chernyshov.jpg' ?>);
        background-attachment: fixed;
    }

    .brands {
        margin: 70px 0;
    }

    .logo-container {
        margin: auto;
        padding-left: 50px;
        padding-right: 50px;
    }

    .offer {
        background-image: url(<?php echo BASE_PATH . '/public/images/offer_iphone.jpg' ?>);
        margin-bottom: 80px;
        padding: 30px 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .brand{
        object-fit: contain !important;
    }
</style>

<button onclick="topFunction()" id="myBtn" title="Go to top">
    <img src="<?php echo BASE_PATH . "/public/icons/expand_less.png" ?>">
</button>
<script type="text/javascript">
    //Get the button
    var mybutton = document.getElementById("myBtn");

    window.onscroll = function() {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script>

<!-- Banner -->
<div class="hero-image" id="bannerHomePage">
    <div class="hero-text">
        <h4>Welcome to</h4>
        <h2>Laptop Do Minh</h2>
        <a href="#feature-section" class="button">Explore now</a>
    </div>
</div>

<!-- Brands -->
<div class="brands">
    <div class="logo-container">
        <h2 class="title">Brands</h2>
        <div class="row">
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/macOs.png' ?>">
            </div>
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/asus.jpg' ?>">
            </div>
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/dell.jpg' ?>">
            </div>
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/hp.png' ?>">
            </div>
        </div>
        <div class="row">
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/MSI.png' ?>">
            </div>
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/samsung.png' ?>">
            </div>
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/lenovo.png' ?>">
            </div>
            <div class="col-4" id="categories">
                <img class="brand" src="<?php echo BASE_PATH . '/public/brands/lg.png' ?>">
            </div>
        </div>
    </div>
</div>

<!-- Offer -->
<div class="hero-image" style="background-image: url(<?php echo BASE_PATH . '/public/attachmentBackground/MacOSM1.jpg' ?>); margin-bottom: 70px;">
    <div class="hero-text">
        <h4 style="color: #fff;">Exclusively Available on Do Minh Store</h4>
        <h2 style="margin: 20px 0;">Macbook M1 Pro</h2>
        <smal style="color: #fff;">
            M1 chip - The first gen chip made by MacOS.
            <br>
            Retina 13.3 inches Resolution 2560 x  1600 
            <br>
            RAM 16GB - Really strong for all developers
        </smal>
    </div>
</div>

<!-- Products -->
<div class="small-container">

    <!-- Featured products -->
    <h2 class="title" id="feature-section">Featured Products</h2>
    <div class="row">
        <?php
        foreach ($featuredProducts as $featuredProduct) {
        ?>
            <div class="col-3" id="featuredProducts">
                <a href="<?php echo BASE_PATH . '/products/view/' . $featuredProduct['Product']['id'] ?>">
                    <img src="<?php echo BASE_PATH . '/public/images/' . $featuredProduct['Product']['image'] . '_0.jpg'; ?>">
                </a>
                <h4><?php echo $featuredProduct['Product']['name']; ?></h4>
                <p>$<?php echo $featuredProduct['Product']['price']; ?></p>
            </div>
        <?php
        }
        ?>
    </div>

    <!-- Latest products -->
    <h2 class="title">Latest Products</h2>
    <div class="row">
        <?php
        for ($i = 0; $i < count($latestProducts); $i++) {
        ?>
            <div class="col-4" id="latestProducts">
                <a href="<?php echo BASE_PATH . '/products/view/' . $latestProducts[$i]['Product']['id'] ?>">
                    <img src="<?php echo BASE_PATH . '/public/images/' . $latestProducts[$i]['Product']['image'] . '_0.jpg'; ?>">
                </a>
                <h4><?php echo $latestProducts[$i]['Product']['name']; ?></h4>
                <p>$<?php echo $latestProducts[$i]['Product']['price']; ?></p>
            </div>
        <?php
        }
        ?>
    </div>

</div>