
<form action="checkHash.php" method="post">
<input type ="text" name ="enteredCode">"Enter the other user's confirmation code here: "/>
<input type ="submit" value="Submit">
</form>

<?php
function checkConfirmationCode() {
  $enteredCode =  $_POST['enteredCode'];
  if (strcmp($code, $enteredCode) == 0) {

  }
  else {
    echo "Wrong code. Try again."
  }
}

checkConfirmationCode();
?>
