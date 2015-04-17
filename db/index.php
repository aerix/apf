<?php
/* Http query to MySql database.
 *
 * VetalAerix@gmail.com
 * 17.11.2014
 */

if (count($_POST) == 0 && count($_GET) == 0)
{
    // Help.
    readfile("help.html");
    exit(0);
}

if (empty($_POST["sql"]) && empty($_GET["sql"]))
{
    header("HTTP/1.1 406 Not acceptable");    
    exit('The "sql" parameter is required.');
}

check_parameter_conflict("server");
check_parameter_conflict("user");
check_parameter_conflict("password");
check_parameter_conflict("database");
check_parameter_conflict("sql");

$server = parameter_value("server");
$user = parameter_value("user");
$password = parameter_value("password");
$database = parameter_value("database");
$sql = parameter_value("sql");

@$connection = new mysqli($server, $user, $password, $database);
if (!$connection->connect_errno != 0)
{
    try
    {
        $result = $connection->query($sql);
        
        if (!empty($result))
        {
            $rows = array();
            if(!empty($result->num_rows) && $result->num_rows > 0)
            {
                while($row = $result->fetch_assoc())
                {
                    $rows[] = $row;
                }
                print(json_encode($rows));
            }
            else
            {
            	print('[{"result": "[Empty]"}]');
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad request");            
            print($connection->error);
        }
        $connection->close();
    }
    catch(Exception $e)
    {
        header("HTTP/1.1 400 Bad request"); 
        print($e);
    }
}
else
{
    header("HTTP/1.1 403 Forbidden");    
    print($connection->connect_error);
}


function is_conflict_parameter($parameter_name)
{
    if (!empty($_GET[$parameter_name]) && !empty($_POST[$parameter_name]))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function conflict_parameter_message($parameter_name)
{
    return sprintf('Overlapping of the item "%s" in "get" and "post" sets of parameters.', $parameter_name);
}

function check_parameter_conflict($parameter_name)
{
    if (is_conflict_parameter($parameter_name))
    {
        header("HTTP/1.1 409 Conflict");         
        exit(conflict_parameter_message($parameter_name)); // Terminate script.
    }
}

function parameter_value($parameter_name)
{
    $value = null;
    if (!empty($_POST[$parameter_name]))
    {
        $value = $_POST[$parameter_name];
    }
    else
    {
        if (!empty($_GET[$parameter_name]))
        {
            $value = $_GET[$parameter_name];
        }
    }
    return $value;
}
?>
