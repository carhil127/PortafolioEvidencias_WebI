function propina(){
    var n1=document.getElementById("pagar").value;
    var n2=document.getElementById("porcentaje").value;
    var porcentaje=parseFloat(n2)/100;
    var propina=parseInt(n1)*parseFloat(porcentaje);
    var total=parseInt(n1)+parseFloat(propina);
    document.getElementById("resultado").innerHTML=total;
     document.getElementById("resultado").innerHTML= "\<br>Propina:" + propina + "\<br>Total a pagar:" + total;
}
