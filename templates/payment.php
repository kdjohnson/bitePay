<?php

require '../vendor/autoload.php';

Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('45bj53v2vgp4hkhk');
Braintree_Configuration::publicKey('2863wt2rpm46fkhz');
Braintree_Configuration::privateKey('34e89afa8265dd1db22985e0ba59eff6');

echo($clientToken = Braintree_ClientToken::generate());
