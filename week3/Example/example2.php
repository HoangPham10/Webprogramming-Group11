<html>
    <head><title>Decisions</title></head>
    <body>
        <?php
            $name1= $_POST["name1"];
            $name2= $_POST["name2"];  
            if ($name1 == $name2) {
                print ("$name1 is equal to $name2" );
            } else{
                print ("$name1 is not equal to $name2");
            }

        ?>
    </body>
</html>