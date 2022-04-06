<html>
    <head>
        <title>Reciving input</title>
    </head>
    <body>
        <?php
            $username = $_POST["name"];
            $class = $_POST["class"];
            $university = $_POST["university"];
            $hobby = $_POST["hobby"];
            print("<br>Hello $username");
            print("<br>You are studying at  $class, $university");
            print("<br>Your hobby is ");
            for ($x = 0; $x < count($hobby); $x++) {
                $next_x = $x + 1; 
                print("<br>     $next_x.    $hobby[$x] ");
            }
        ?>
    </body>
</html>