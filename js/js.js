var page=1;
function prejdivpravo(strana)
{
	prejdihore(4);
	document.getElementById("page"+strana).setAttribute("style","-webkit-transform:translateX(-100%);");
	page=strana;
}

function prejdivlavo(strana)
{
	prejdihore(4);
	document.getElementById("page"+strana).setAttribute("style","-webkit-transform:translateX(0px);");
	page=1;
}

function prejdidole(strana)
{
	document.getElementById("page"+strana).setAttribute("style","-webkit-transform:translateY(-100%);");
	page=4;
}

function prejdihore(strana)
{
	document.getElementById("page"+strana).setAttribute("style","-webkit-transform:translateY(0px);");
	page=2;
}

var polickox=0;
var polickoy=0;
var cislohry=-1;
var pocetkrokov=0;
var d = new Date();
var casinterval;
var cas=0;
var zapnutahra=0;

function vpisdopolicka(x,y)
{
	var polickocislo=((x-1)*9+y-1);
	if(hra_zadanie[cislohry][polickocislo]=='0')
	{
		polickox=x;
		polickoy=y;
		prejdidole(4);
	}
}

function vyplnpolicko(hodnota)
{
	var pocetcisiel=0;
	var polickocislo=((polickox-1)*9+polickoy-1);
	if(hra_zadanie[cislohry][polickocislo]=='0')
	{
		if (hodnota=='0')
		{
			document.getElementById(polickox + 'x' + polickoy).innerHTML='';
			pocetkrokov++;
		}
		else
		{
			document.getElementById(polickox + 'x' + polickoy).innerHTML=hodnota;
			pocetkrokov++;
		}
		var polickocislo=((polickox-1)*9+polickoy-1);
		hra_aktualna[polickocislo]=hodnota;
		pocetcisiel=0;
		if(hodnota!=0)
		{
			pocetcisiel=pocetcisiel+kontrolariadku(polickox,polickoy,hodnota);
			pocetcisiel=pocetcisiel+kontrolastlpca(polickox,polickoy,hodnota);
			pocetcisiel=pocetcisiel+kontrolastvorca(polickox,polickoy,hodnota);
			if(pocetcisiel!=0)
			{
				document.getElementById(polickox+'x'+polickoy).setAttribute("style","background:red;");
				hra_chyby[polickocislo]=1;
			}
			else 
			{
				document.getElementById(polickox+'x'+polickoy).setAttribute("style","background:none;");
				hra_chyby[polickocislo]=0;
			}
			
		}
		skontrolujstarechyby();
		zmenpocetkrokov();
		skontrolujkoniechry();
		polickox=0;
		polickoy=0;
		prejdihore(4);
	}
}

function skontrolujkoniechry()
{
	var pocetvyplnenych=0;
	var pocetchyb=0;
	for(var i=0;i<81;i++)
	{
		//alert(hra_aktualna[i]);
		if(hra_aktualna[i]!=0)pocetvyplnenych++;
	}
	//alert(pocetvyplnenych);
	if(pocetvyplnenych==81)
	{
		for(var i=0;i<81;i++)
		{
			if(hra_aktualna[i]!=hra_riesenie[cislohry][i])pocetchyb++;
		}
		if(pocetchyb==0)
		{
			pausegame();
			alert('THE END!\n\nSteps: '+pocetkrokov+'\nTime: '+formatcasu(cas/1000));
			prejdivlavo(2);
		}
	}
	else return 1;
}

function naplnhraciepole(narocnost)
{
	pocetkrokov=0;
	var date = new Date();
	casinterval = date.getTime();
	zapnutahra=1;
	cas=0
	zmencas();
	dlzkapola=hra_zadanie.length;
	if(narocnost==0)cislohry=Math.floor((Math.random() * 10000)%easy);
	if(narocnost==1)cislohry=Math.floor((Math.random() * 10000)%medium+easy);
	if(narocnost==2)cislohry=Math.floor((Math.random() * 10000)%hard+easy+medium);
	pole=cislohry;
	for (var i; i<81; i++)hra_chyby[i]=0;
	var pocitadlo = 0;
	for (var i=1; i<=9; i++){
		for(var j=1; j<=9; j++)
		{
			if (hra_zadanie[pole][pocitadlo]!='0')
			{
				document.getElementById(i + 'x' + j).innerHTML="<h3>" + hra_zadanie[pole][pocitadlo] + "</h3>";
			}
			else document.getElementById(i + 'x' + j).innerHTML="&nbsp;";
			document.getElementById(i+'x'+j).setAttribute("style","background:none;");
			hra_aktualna[pocitadlo]=hra_zadanie[pole][pocitadlo]
			pocitadlo++;
		}
	}
	zmenpocetkrokov();
	prejdivpravo(2);
	setTimeout(function () {prejdivlavo(5);},200);
}

function zmencas()
{
	var date = new Date();
	var pom=date.getTime();
	cas=cas + pom - casinterval;
	casinterval=pom;
	document.getElementById('cashry').innerHTML=formatcasu(cas/1000);
	if(zapnutahra==1)setTimeout(function () {zmencas();},20);
	else return 1;
}

function pausegame()
{
	zapnutahra=0;
}

function formatcasu(pom)
{
  var sec_num = parseInt(pom, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = hours+':'+minutes+':'+seconds;
  return time;
}

function zmenpocetkrokov()
{
	document.getElementById('okkroky').innerHTML=pocetkrokov;
}

function pokracuj()
{
	zapnutahra=1;
	var date = new Date();
	casinterval = date.getTime();
	if(cislohry!=-1)prejdivpravo(2);
	zmencas();
}

function kontrolastvorca(x,y,cislo)
{
	var polickocislo;
	var stvorecx= Math.floor( (x-1)/3 );
	var stvorecy= Math.floor( (y-1)/3 );
	var pocetcisiel=0;
	zacx=3*stvorecx+1;
	zacy=3*stvorecy+1;
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<3;j++)
		{
			var ax=(zacx+i);
			var ay=(zacy+j);
			polickocislo=(((zacx+i)-1)*9+(zacy+j)-1);
			if(hra_aktualna[polickocislo]==cislo)
			{
				if((zacx+i)==x && (zacy+j)==y);
				else
				{
					if(cislo!=0)pocetcisiel++;
					if(cislo!=0)document.getElementById(ax+'x'+ay).setAttribute("style","background:red;");
				}
			}
			else document.getElementById((zacx+i)+'x'+(zacy+j)).setAttribute("style","background:none;");
		}
	}
	return pocetcisiel;
}

function kontrolastlpca(x,y,cislo)
{
	var polickocislo;
	var pocetcisiel=0;
	for(var i=1; i<=9; i++)
	{
		var ax=(i);
		var ay=(y);
		polickocislo=((i-1)*9+(y)-1);
		if(hra_aktualna[polickocislo]==cislo && i!= x)
		{
			if(cislo!=0)pocetcisiel=pocetcisiel+1;
			if(cislo!=0)document.getElementById(ax+'x'+ay).setAttribute("style","background:red;");
		}
		else document.getElementById((ax)+'x'+(ay)).setAttribute("style","background:none;");
	}
	return pocetcisiel;
}

function kontrolariadku (x,y,cislo)
{
	var polickocislo;
	var pocetcisiel=0;
	for(var i=1; i<=9; i++)
	{
		var ax=(x);
		var ay=(i);
		polickocislo=((x-1)*9+(i)-1);
		if(hra_aktualna[polickocislo]==cislo && i!= y)
		{
			if(cislo!=0)pocetcisiel++;
			if(cislo!=0)document.getElementById(ax+'x'+ay).setAttribute("style","background:red;");
		}
		else document.getElementById((ax)+'x'+(ay)).setAttribute("style","background:none;");
	}
	return pocetcisiel;
}

function skontrolujstarechyby()
{
	for(var i=0;i<81;i++)
	{
		var pocetcisiel;
		if(hra_chyby[i]==1)
		{
			x=Math.floor( (i)/9+1 );
			y=i%9+1;
			hodnota=hra_aktualna[i];
			pocetcisiel=pocetcisiel+kontrolariadku(x,y,hodnota);
			pocetcisiel=pocetcisiel+kontrolastlpca(x,y,hodnota);
			pocetcisiel=pocetcisiel+kontrolastvorca(x,y,hodnota);
			if(pocetcisiel!=0)
			{
				if(hodnota!=0)document.getElementById(x+'x'+y).setAttribute("style","background:red;");
				if(hodnota!=0)hra_chyby[i]=1;
			}
			else 
			{
				document.getElementById(x+'x'+y).setAttribute("style","background:none;");
				hra_chyby[i]=0;
			}
		}
	}
}