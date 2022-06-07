<html>
    <head><title>Distance and Time Calculations</title></head>
    <body>
        <?php 
            $cites = array('Dallas' => 803, 'Toronto' => 435, "Boston" => 848, "Nashville" => 406, "Las Vegas" => 1526, "San Francisco" => 1835, "Washington, DC" => 595, "Miami" => 1189, "Pittsburgh" => 409);
            $destination = $_GET['destination'];
            print " From Chicago to <br/><table> 
                <tr>
                    <th>No.</th>
                    <th>Destination</th>
                    <th>Distance</th>
                    <th>Driving time</th>
                    <th>Walking time</th>
                </tr>
            " ;           
            $i = 1;
            foreach($destination as $desItem){
                if(isset($cites[$desItem])){
                    $distance = $cites[$desItem];
                    $time = round(($distance/60), 2);
                    $walktime = round($distance/5,2);
                    print"<tr>
                        <td>$i</td>
                        <td>$desItem</td>
                        <td>$distance</td>
                        <td>$time</td>
                        <td>$walktime</td>
                    </tr>";
                    $i = $i + 1;
                }
            }

        ?>
    </body>
</html>