function MostrarLocalidad() {
    var obj = JSON.parse(localidades);
    var oJSON = sortJSON(obj, 'municipio', 'asc');
    console.log(oJSON);
    var cadena=`<select name="municipio" id="municipio" onchange="selectDepartamento()"  class="form-control form-control-sm" required>
    <option value="">Municipio</option> `;
    oJSON.forEach(element => {
        cadena+=`<option value="${element.municipio}">${element.municipio}</option>`;
    });
    cadena+=`</select>`;
    $('#munis').html(cadena);
    
}

function NombreCiudad() {
    $('#ciudad').val($('select[name="municipio"] option:selected').text());    
  }

function selectDepartamento() {
    var mun=$('#municipio').val();
    var obj = JSON.parse(localidades);
    obj.forEach(element => {
        if (mun==element.municipio) {
            $('#departamento').val(element.departamento);
            $('#cddep').val(element.coddepartamento);
            $('#cdm').val(element.codmunicipio);
            NombreCiudad();
        }
    });
    
}

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function calculateAge() {
    var birthday=$('#nacimiento').val();
    var birthday_arr = birthday.split("-");
    var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[1]);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    $('#edad').val(Math.abs(ageDate.getUTCFullYear() - 1970));
}


var localidades = `[
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "001",
            "municipio": "MEDELLIN"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "002",
            "municipio": "ABEJORRAL"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "004",
            "municipio": "ABRIAQUI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "021",
            "municipio": "ALEJANDRIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "030",
            "municipio": "AMAGA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "031",
            "municipio": "AMALFI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "034",
            "municipio": "ANDES"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "036",
            "municipio": "ANGELOPOLIS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "038",
            "municipio": "ANGOSTURA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "040",
            "municipio": "ANORI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "042",
            "municipio": "ANTIOQUIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "044",
            "municipio": "ANZA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "045",
            "municipio": "APARTADO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "051",
            "municipio": "ARBOLETES"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "055",
            "municipio": "ARGELIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "059",
            "municipio": "ARMENIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "079",
            "municipio": "BARBOSA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "086",
            "municipio": "BELMIRA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "088",
            "municipio": "BELLO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "091",
            "municipio": "BETANIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "093",
            "municipio": "BETULIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "101",
            "municipio": "BOLIVAR"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "107",
            "municipio": "BRICEÑO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "113",
            "municipio": "BURITICA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "120",
            "municipio": "CACERES"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "125",
            "municipio": "CAICEDO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "129",
            "municipio": "CALDAS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "134",
            "municipio": "CAMPAMENTO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "138",
            "municipio": "CAÑASGORDAS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "142",
            "municipio": "CARACOLI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "145",
            "municipio": "CARAMANTA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "147",
            "municipio": "CAREPA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "148",
            "municipio": "CARMEN DE VIBORAL"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "150",
            "municipio": "CAROLINA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "154",
            "municipio": "CAUCASIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "172",
            "municipio": "CHIGORODO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "190",
            "municipio": "CISNEROS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "197",
            "municipio": "COCORNA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "206",
            "municipio": "CONCEPCION"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "209",
            "municipio": "CONCORDIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "212",
            "municipio": "COPACABANA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "234",
            "municipio": "DABEIBA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "237",
            "municipio": "DON MATIAS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "240",
            "municipio": "EBEJICO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "250",
            "municipio": "EL BAGRE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "264",
            "municipio": "ENTRERRIOS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "266",
            "municipio": "ENVIGADO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "282",
            "municipio": "FREDONIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "284",
            "municipio": "FRONTINO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "306",
            "municipio": "GIRALDO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "308",
            "municipio": "GIRARDOTA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "310",
            "municipio": "GOMEZ PLATA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "313",
            "municipio": "GRANADA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "315",
            "municipio": "GUADALUPE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "318",
            "municipio": "GUARNE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "321",
            "municipio": "GUATAPE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "347",
            "municipio": "HELICONIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "353",
            "municipio": "HISPANIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "360",
            "municipio": "ITAGUI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "361",
            "municipio": "ITUANGO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "364",
            "municipio": "JARDIN"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "368",
            "municipio": "JERICO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "376",
            "municipio": "LA CEJA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "380",
            "municipio": "LA ESTRELLA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "390",
            "municipio": "LA PINTADA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "400",
            "municipio": "LA UNION"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "411",
            "municipio": "LIBORINA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "425",
            "municipio": "MACEO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "440",
            "municipio": "MARINILLA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "467",
            "municipio": "MONTEBELLO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "475",
            "municipio": "MURINDO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "480",
            "municipio": "MUTATA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "483",
            "municipio": "NARIÑO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "490",
            "municipio": "NECOCLI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "495",
            "municipio": "NECHI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "501",
            "municipio": "OLAYA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "541",
            "municipio": "PEÑOL"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "543",
            "municipio": "PEQUE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "576",
            "municipio": "PUEBLORRICO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "579",
            "municipio": "PUERTO BERRIO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "585",
            "municipio": "PUERTO NARE (LAMAGDALENA)"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "591",
            "municipio": "PUERTO TRIUNFO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "604",
            "municipio": "REMEDIOS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "607",
            "municipio": "RETIRO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "615",
            "municipio": "RIONEGRO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "628",
            "municipio": "SABANALARGA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "631",
            "municipio": "SABANETA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "642",
            "municipio": "SALGAR"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "647",
            "municipio": "SAN ANDRES"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "649",
            "municipio": "SAN CARLOS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "652",
            "municipio": "SAN FRANCISCO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "656",
            "municipio": "SAN JERONIMO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "658",
            "municipio": "SAN JOSE DE LA MONTAÑA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "659",
            "municipio": "SAN JUAN DE URABA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "660",
            "municipio": "SAN LUIS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "664",
            "municipio": "SAN PEDRO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "665",
            "municipio": "SAN PEDRO DE URABA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "667",
            "municipio": "SAN RAFAEL"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "670",
            "municipio": "SAN ROQUE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "674",
            "municipio": "SAN VICENTE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "679",
            "municipio": "SANTA BARBARA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "686",
            "municipio": "SANTA ROSA DE OSOS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "690",
            "municipio": "SANTO DOMINGO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "697",
            "municipio": "SANTUARIO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "736",
            "municipio": "SEGOVIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "756",
            "municipio": "SONSON"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "761",
            "municipio": "SOPETRAN"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "789",
            "municipio": "TAMESIS"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "790",
            "municipio": "TARAZA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "792",
            "municipio": "TARSO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "809",
            "municipio": "TITIRIBI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "819",
            "municipio": "TOLEDO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "837",
            "municipio": "TURBO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "842",
            "municipio": "URAMITA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "847",
            "municipio": "URRAO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "854",
            "municipio": "VALDIVIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "856",
            "municipio": "VALPARAISO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "858",
            "municipio": "VEGACHI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "861",
            "municipio": "VENECIA"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "873",
            "municipio": "VIGIA DEL FUERTE"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "885",
            "municipio": "YALI"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "887",
            "municipio": "YARUMAL"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "890",
            "municipio": "YOLOMBO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "893",
            "municipio": "YONDO"
        },
        {
            "coddepartamento": "05",
            "departamento": "Antioquia",
            "codmunicipio": "895",
            "municipio": "ZARAGOZA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "001",
            "municipio": "BARRANQUILLA (DISTRITO ESPECIAL, INDUSTRIAL Y PORTUARIO DEBARRANQUILLA)"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "078",
            "municipio": "BARANOA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "137",
            "municipio": "CAMPO DE LA CRUZ"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "141",
            "municipio": "CANDELARIA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "296",
            "municipio": "GALAPA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "372",
            "municipio": "JUAN DE ACOSTA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "421",
            "municipio": "LURUACO"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "433",
            "municipio": "MALAMBO"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "436",
            "municipio": "MANATI"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "520",
            "municipio": "PALMAR DE VARELA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "549",
            "municipio": "PIOJO"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "558",
            "municipio": "POLO NUEVO"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "560",
            "municipio": "PONEDERA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "573",
            "municipio": "PUERTO COLOMBIA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "606",
            "municipio": "REPELON"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "634",
            "municipio": "SABANAGRANDE"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "638",
            "municipio": "SABANALARGA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "675",
            "municipio": "SANTA LUCIA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "685",
            "municipio": "SANTO TOMAS"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "758",
            "municipio": "SOLEDAD"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "770",
            "municipio": "SUAN"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "832",
            "municipio": "TUBARA"
        },
        {
            "coddepartamento": "08",
            "departamento": "Atlantico",
            "codmunicipio": "849",
            "municipio": "USIACURI"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "001",
            "municipio": "SANTA FE DE BOGOTA, D. C."
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "001",
            "municipio": "SANTAFE DE BOGOTA D.C.-USAQUEN"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "002",
            "municipio": "SANTAFE DE BOGOTA D.C.-CHAPINERO"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "003",
            "municipio": "SANTAFE DE BOGOTA D.C.-SANTA FE"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "004",
            "municipio": "SANTAFE DE BOGOTA D.C.-SAN CRISTOBAL"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "005",
            "municipio": "SANTAFE DE BOGOTA D.C.-USME"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "006",
            "municipio": "SANTAFE DE BOGOTA D.C.-TUNJUELITO"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "007",
            "municipio": "SANTAFE DE BOGOTA D.C.-BOSA"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "008",
            "municipio": "SANTAFE DE BOGOTA D.C.-KENNEDY"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "009",
            "municipio": "SANTAFE DE BOGOTA D.C.-FONTIBON"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "010",
            "municipio": "SANTAFE DE BOGOTA D.C.-ENGATIVA"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "011",
            "municipio": "SANTAFE DE BOGOTA D.C.-SUBA"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "012",
            "municipio": "SANTAFE DE BOGOTA D.C.-BARRIOS UNIDOS"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "013",
            "municipio": "SANTAFE DE BOGOTA D.C.-TEUSAQUILLO"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "014",
            "municipio": "SANTAFE DE BOGOTA D.C.-MARTIRES"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "015",
            "municipio": "SANTAFE DE BOGOTA D.C.-ANTONIO NARIÑO"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "016",
            "municipio": "SANTAFE DE BOGOTA D.C.-PUENTE ARANDA"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "017",
            "municipio": "SANTAFE DE BOGOTA D.C.-CANDELARIA"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "018",
            "municipio": "SANTAFE DE BOGOTA D.C.-RAFAEL URIBE"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "019",
            "municipio": "SANTAFE DE BOGOTA D.C.-CIUDAD BOLIVAR"
        },
        {
            "coddepartamento": "11",
            "departamento": "Santa Fe de Bogotá",
            "codmunicipio": "020",
            "municipio": "SANTAFE DE BOGOTA D.C.-SUMAPAZ"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "001",
            "municipio": "CARTAGENA (DISTRITO TURISTICO Y CULTURAL DE CARTAGENA)"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "006",
            "municipio": "ACHI"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "030",
            "municipio": "ALTOS DEL ROSARIO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "042",
            "municipio": "ARENAL"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "052",
            "municipio": "ARJONA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "062",
            "municipio": "ARROYOHONDO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "074",
            "municipio": "BARRANCO DE LOBA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "140",
            "municipio": "CALAMAR"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "160",
            "municipio": "CANTAGALLO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "188",
            "municipio": "CICUCO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "212",
            "municipio": "CORDOBA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "222",
            "municipio": "CLEMENCIA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "244",
            "municipio": "EL CARMEN DE BOLIVAR"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "248",
            "municipio": "EL GUAMO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "268",
            "municipio": "EL PEÑON"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "300",
            "municipio": "HATILLO DE LOBA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "430",
            "municipio": "MAGANGUE"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "433",
            "municipio": "MAHATES"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "440",
            "municipio": "MARGARITA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "442",
            "municipio": "MARIA LA BAJA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "458",
            "municipio": "MONTECRISTO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "468",
            "municipio": "MOMPOS"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "473",
            "municipio": "MORALES"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "549",
            "municipio": "PINILLOS"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "580",
            "municipio": "REGIDOR"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "600",
            "municipio": "RIO VIEJO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "620",
            "municipio": "SAN CRISTOBAL"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "647",
            "municipio": "SAN ESTANISLAO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "650",
            "municipio": "SAN FERNANDO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "654",
            "municipio": "SAN JACINTO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "655",
            "municipio": "SAN JACINTO DEL CAUCA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "657",
            "municipio": "SAN JUAN NEPOMUCENO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "667",
            "municipio": "SAN MARTIN DE LOBA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "670",
            "municipio": "SAN PABLO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "673",
            "municipio": "SANTA CATALINA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "683",
            "municipio": "SANTA ROSA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "688",
            "municipio": "SANTA ROSA DEL SUR"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "744",
            "municipio": "SIMITI"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "760",
            "municipio": "SOPLAVIENTO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "780",
            "municipio": "TALAIGUA NUEVO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "810",
            "municipio": "TIQUISIO (PUERTO RICO)"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "836",
            "municipio": "TURBACO"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "838",
            "municipio": "TURBANA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "873",
            "municipio": "VILLANUEVA"
        },
        {
            "coddepartamento": "13",
            "departamento": "Bolivar",
            "codmunicipio": "894",
            "municipio": "ZAMBRANO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "001",
            "municipio": "TUNJA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "022",
            "municipio": "ALMEIDA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "047",
            "municipio": "AQUITANIA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "051",
            "municipio": "ARCABUCO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "087",
            "municipio": "BELEN"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "090",
            "municipio": "BERBEO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "092",
            "municipio": "BETEITIVA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "097",
            "municipio": "BOAVITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "104",
            "municipio": "BOYACA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "106",
            "municipio": "BRICEÑO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "109",
            "municipio": "BUENAVISTA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "114",
            "municipio": "BUSBANZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "131",
            "municipio": "CALDAS"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "135",
            "municipio": "CAMPOHERMOSO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "162",
            "municipio": "CERINZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "172",
            "municipio": "CHINAVITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "176",
            "municipio": "CHIQUINQUIRA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "180",
            "municipio": "CHISCAS"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "183",
            "municipio": "CHITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "185",
            "municipio": "CHITARAQUE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "187",
            "municipio": "CHIVATA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "189",
            "municipio": "CIENEGA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "204",
            "municipio": "COMBITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "212",
            "municipio": "COPER"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "215",
            "municipio": "CORRALES"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "218",
            "municipio": "COVARACHIA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "223",
            "municipio": "CUBARA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "224",
            "municipio": "CUCAITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "226",
            "municipio": "CUITIVA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "232",
            "municipio": "CHIQUIZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "236",
            "municipio": "CHIVOR"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "238",
            "municipio": "DUITAMA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "244",
            "municipio": "EL COCUY"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "248",
            "municipio": "EL ESPINO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "272",
            "municipio": "FIRAVITOBA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "276",
            "municipio": "FLORESTA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "293",
            "municipio": "GACHANTIVA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "296",
            "municipio": "GAMEZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "299",
            "municipio": "GARAGOA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "317",
            "municipio": "GUACAMAYAS"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "322",
            "municipio": "GUATEQUE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "325",
            "municipio": "GUAYATA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "332",
            "municipio": "GUICAN"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "362",
            "municipio": "IZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "367",
            "municipio": "JENESANO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "368",
            "municipio": "JERICO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "377",
            "municipio": "LABRANZAGRANDE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "380",
            "municipio": "LA CAPILLA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "401",
            "municipio": "LA VICTORIA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "403",
            "municipio": "LA UVITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "407",
            "municipio": "VILLA DE LEIVA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "425",
            "municipio": "MACANAL"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "442",
            "municipio": "MARIPI"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "455",
            "municipio": "MIRAFLORES"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "464",
            "municipio": "MONGUA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "466",
            "municipio": "MONGUI"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "469",
            "municipio": "MONIQUIRA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "476",
            "municipio": "MOTAVITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "480",
            "municipio": "MUZO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "491",
            "municipio": "NOBSA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "494",
            "municipio": "NUEVO COLON"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "500",
            "municipio": "OICATA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "507",
            "municipio": "OTANCHE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "511",
            "municipio": "PACHAVITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "514",
            "municipio": "PAEZ"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "516",
            "municipio": "PAIPA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "518",
            "municipio": "PAJARITO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "522",
            "municipio": "PANQUEBA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "531",
            "municipio": "PAUNA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "533",
            "municipio": "PAYA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "537",
            "municipio": "PAZ DEL RIO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "542",
            "municipio": "PESCA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "550",
            "municipio": "PISBA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "572",
            "municipio": "PUERTO BOYACA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "580",
            "municipio": "QUIPAMA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "599",
            "municipio": "RAMIRIQUI"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "600",
            "municipio": "RAQUIRA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "621",
            "municipio": "RONDON"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "632",
            "municipio": "SABOYA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "638",
            "municipio": "SACHICA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "646",
            "municipio": "SAMACA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "660",
            "municipio": "SAN EDUARDO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "664",
            "municipio": "SAN JOSE DE PARE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "667",
            "municipio": "SAN LUIS DE GACENO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "673",
            "municipio": "SAN MATEO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "676",
            "municipio": "SAN MIGUEL DE SEMA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "681",
            "municipio": "SAN PABLO DE BORBUR"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "686",
            "municipio": "SANTANA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "690",
            "municipio": "SANTA MARIA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "693",
            "municipio": "SANTA ROSA DE VITERBO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "696",
            "municipio": "SANTA SOFIA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "720",
            "municipio": "SATIVANORTE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "723",
            "municipio": "SATIVASUR"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "740",
            "municipio": "SIACHOQUE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "753",
            "municipio": "SOATA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "755",
            "municipio": "SOCOTA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "757",
            "municipio": "SOCHA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "759",
            "municipio": "SOGAMOSO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "761",
            "municipio": "SOMONDOCO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "762",
            "municipio": "SORA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "763",
            "municipio": "SOTAQUIRA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "764",
            "municipio": "SORACA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "774",
            "municipio": "SUSACON"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "776",
            "municipio": "SUTAMARCHAN"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "778",
            "municipio": "SUTATENZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "790",
            "municipio": "TASCO"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "798",
            "municipio": "TENZA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "804",
            "municipio": "TIBANA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "806",
            "municipio": "TIBASOSA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "808",
            "municipio": "TINJACA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "810",
            "municipio": "TIPACOQUE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "814",
            "municipio": "TOCA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "816",
            "municipio": "TOGUI"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "820",
            "municipio": "TOPAGA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "822",
            "municipio": "TOTA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "832",
            "municipio": "TUNUNGUA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "835",
            "municipio": "TURMEQUE"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "837",
            "municipio": "TUTA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "839",
            "municipio": "TUTASA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "842",
            "municipio": "UMBITA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "861",
            "municipio": "VENTAQUEMADA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "879",
            "municipio": "VIRACACHA"
        },
        {
            "coddepartamento": "15",
            "departamento": "Boyaca",
            "codmunicipio": "897",
            "municipio": "ZETAQUIRA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "001",
            "municipio": "MANIZALES"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "013",
            "municipio": "AGUADAS"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "042",
            "municipio": "ANSERMA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "050",
            "municipio": "ARANZAZU"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "088",
            "municipio": "BELALCAZAR"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "174",
            "municipio": "CHINCHINA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "272",
            "municipio": "FILADELFIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "380",
            "municipio": "LA DORADA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "388",
            "municipio": "LA MERCED"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "433",
            "municipio": "MANZANARES"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "442",
            "municipio": "MARMATO"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "444",
            "municipio": "MARQUETALIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "446",
            "municipio": "MARULANDA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "486",
            "municipio": "NEIRA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "495",
            "municipio": "NORCASIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "513",
            "municipio": "PACORA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "524",
            "municipio": "PALESTINA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "541",
            "municipio": "PENSILVANIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "614",
            "municipio": "RIOSUCIO"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "616",
            "municipio": "RISARALDA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "653",
            "municipio": "SALAMINA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "662",
            "municipio": "SAMANA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "665",
            "municipio": "SAN JOSE"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "777",
            "municipio": "SUPIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "867",
            "municipio": "VICTORIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "873",
            "municipio": "VILLAMARIA"
        },
        {
            "coddepartamento": "17",
            "departamento": "Caldas",
            "codmunicipio": "877",
            "municipio": "VITERBO"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "001",
            "municipio": "FLORENCIA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "029",
            "municipio": "ALBANIA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "094",
            "municipio": "BELEN DE LOS ANDAQUIES"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "150",
            "municipio": "CARTAGENA DEL CHAIRA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "205",
            "municipio": "CURILLO"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "247",
            "municipio": "EL DONCELLO"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "256",
            "municipio": "EL PAUJIL"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "410",
            "municipio": "LA MONTAÑITA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "460",
            "municipio": "MILAN"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "479",
            "municipio": "MORELIA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "592",
            "municipio": "PUERTO RICO"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "610",
            "municipio": "SAN JOSE DE FRAGUA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "753",
            "municipio": "SAN  VICENTE DEL CAGUAN"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "756",
            "municipio": "SOLANO"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "785",
            "municipio": "SOLITA"
        },
        {
            "coddepartamento": "18",
            "departamento": "Caqueta",
            "codmunicipio": "860",
            "municipio": "VALPARAISO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "001",
            "municipio": "POPAYAN"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "022",
            "municipio": "ALMAGUER"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "050",
            "municipio": "ARGELIA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "075",
            "municipio": "BALBOA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "100",
            "municipio": "BOLIVAR"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "110",
            "municipio": "BUENOS AIRES"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "130",
            "municipio": "CAJIBIO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "137",
            "municipio": "CALDONO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "142",
            "municipio": "CALOTO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "212",
            "municipio": "CORINTO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "256",
            "municipio": "EL TAMBO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "290",
            "municipio": "FLORENCIA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "318",
            "municipio": "GUAPI"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "355",
            "municipio": "INZA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "364",
            "municipio": "JAMBALO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "392",
            "municipio": "LA SIERRA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "397",
            "municipio": "LA VEGA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "418",
            "municipio": "LOPEZ (MICAY)"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "450",
            "municipio": "MERCADERES"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "455",
            "municipio": "MIRANDA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "473",
            "municipio": "MORALES"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "513",
            "municipio": "PADILLA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "517",
            "municipio": "PAEZ (BELALCAZAR)"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "532",
            "municipio": "PATIA (EL BORDO)"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "533",
            "municipio": "PIAMONTE"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "548",
            "municipio": "PIENDAMO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "573",
            "municipio": "PUERTO TEJADA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "585",
            "municipio": "PURACE (COCONUCO)"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "622",
            "municipio": "ROSAS"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "693",
            "municipio": "SAN SEBASTIAN"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "698",
            "municipio": "SANTANDER DE QUILICHAO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "701",
            "municipio": "SANTA ROSA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "743",
            "municipio": "SILVIA"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "760",
            "municipio": "SOTARA (PAISPAMBA)"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "780",
            "municipio": "SUAREZ"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "807",
            "municipio": "TIMBIO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "809",
            "municipio": "TIMBIQUI"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "821",
            "municipio": "TORIBIO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "824",
            "municipio": "TOTORO"
        },
        {
            "coddepartamento": "19",
            "departamento": "Cauca",
            "codmunicipio": "845",
            "municipio": "VILLARICA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "001",
            "municipio": "VALLEDUPAR"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "011",
            "municipio": "AGUACHICA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "013",
            "municipio": "AGUSTIN CODAZZI"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "032",
            "municipio": "ASTREA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "045",
            "municipio": "BECERRIL"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "060",
            "municipio": "BOSCONIA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "175",
            "municipio": "CHIMICHAGUA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "178",
            "municipio": "CHIRIGUANA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "228",
            "municipio": "CURUMANI"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "238",
            "municipio": "EL COPEY"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "250",
            "municipio": "EL PASO"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "295",
            "municipio": "GAMARRA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "310",
            "municipio": "GONZALEZ"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "383",
            "municipio": "LA GLORIA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "400",
            "municipio": "LA JAGUA IBIRICO"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "443",
            "municipio": "MANAURE (BALCON DELCESAR)"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "517",
            "municipio": "PAILITAS"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "550",
            "municipio": "PELAYA"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "570",
            "municipio": "PUEBLO BELLO"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "614",
            "municipio": "RIO DE ORO"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "621",
            "municipio": "LA PAZ (ROBLES)"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "710",
            "municipio": "SAN ALBERTO"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "750",
            "municipio": "SAN DIEGO"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "770",
            "municipio": "SAN MARTIN"
        },
        {
            "coddepartamento": "20",
            "departamento": "Cesar",
            "codmunicipio": "787",
            "municipio": "TAMALAMEQUE"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "001",
            "municipio": "MONTERIA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "068",
            "municipio": "AYAPEL"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "079",
            "municipio": "BUENAVISTA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "090",
            "municipio": "CANALETE"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "162",
            "municipio": "CERETE"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "168",
            "municipio": "CHIMA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "182",
            "municipio": "CHINU"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "189",
            "municipio": "CIENAGA DE ORO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "300",
            "municipio": "COTORRA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "350",
            "municipio": "LA APARTADA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "417",
            "municipio": "LORICA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "419",
            "municipio": "LOS CORDOBAS"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "464",
            "municipio": "MOMIL"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "466",
            "municipio": "MONTELIBANO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "500",
            "municipio": "MOÑITOS"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "555",
            "municipio": "PLANETA RICA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "570",
            "municipio": "PUEBLO NUEVO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "574",
            "municipio": "PUERTO ESCONDIDO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "580",
            "municipio": "PUERTO LIBERTADOR"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "586",
            "municipio": "PURISIMA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "660",
            "municipio": "SAHAGUN"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "670",
            "municipio": "SAN ANDRES SOTAVENTO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "672",
            "municipio": "SAN ANTERO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "675",
            "municipio": "SAN BERNARDO DELVIENTO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "678",
            "municipio": "SAN CARLOS"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "686",
            "municipio": "SAN PELAYO"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "807",
            "municipio": "TIERRALTA"
        },
        {
            "coddepartamento": "23",
            "departamento": "Cordova",
            "codmunicipio": "855",
            "municipio": "VALENCIA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "001",
            "municipio": "AGUA DE DIOS"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "019",
            "municipio": "ALBAN"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "035",
            "municipio": "ANAPOIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "040",
            "municipio": "ANOLAIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "053",
            "municipio": "ARBELAEZ"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "086",
            "municipio": "BELTRAN"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "095",
            "municipio": "BITUIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "099",
            "municipio": "BOJACA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "120",
            "municipio": "CABRERA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "123",
            "municipio": "CACHIPAY"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "126",
            "municipio": "CAJICA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "148",
            "municipio": "CAPARRAPI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "151",
            "municipio": "CAQUEZA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "154",
            "municipio": "CARMEN DE CARUPA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "168",
            "municipio": "CHAGUANI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "175",
            "municipio": "CHIA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "178",
            "municipio": "CHIPAQUE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "181",
            "municipio": "CHOACHI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "183",
            "municipio": "CHOCONTA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "200",
            "municipio": "COGUA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "214",
            "municipio": "COTA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "224",
            "municipio": "CUCUNUBA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "245",
            "municipio": "EL COLEGIO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "258",
            "municipio": "EL PEÑON"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "260",
            "municipio": "EL ROSAL"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "269",
            "municipio": "FACATATIVA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "279",
            "municipio": "FOMEQUE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "281",
            "municipio": "FOSCA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "286",
            "municipio": "FUNZA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "288",
            "municipio": "FUQUENE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "290",
            "municipio": "FUSAGASUGA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "293",
            "municipio": "GACHALA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "295",
            "municipio": "GACHANCIPA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "297",
            "municipio": "GACHETA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "299",
            "municipio": "GAMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "307",
            "municipio": "GIRARDOT"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "312",
            "municipio": "GRANADA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "317",
            "municipio": "GUACHETA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "320",
            "municipio": "GUADUAS"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "322",
            "municipio": "GUASCA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "324",
            "municipio": "GUATAQUI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "326",
            "municipio": "GUATAVITA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "328",
            "municipio": "GUAYABAL DE SIQUIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "335",
            "municipio": "GUAYABETAL"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "339",
            "municipio": "GUTIERREZ"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "368",
            "municipio": "JERUSALEN"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "372",
            "municipio": "JUNIN"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "377",
            "municipio": "LA CALERA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "386",
            "municipio": "LA MESA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "394",
            "municipio": "LA PALMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "398",
            "municipio": "LA PEÑA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "402",
            "municipio": "LA VEGA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "407",
            "municipio": "LENGUAZAQUE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "426",
            "municipio": "MACHETA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "430",
            "municipio": "MADRID"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "436",
            "municipio": "MANTA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "438",
            "municipio": "MEDINA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "473",
            "municipio": "MOSQUERA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "483",
            "municipio": "NARIÑO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "486",
            "municipio": "NEMOCON"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "488",
            "municipio": "NILO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "489",
            "municipio": "NIMAIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "491",
            "municipio": "NOCAIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "506",
            "municipio": "VENECIA (OSPINA PEREZ)"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "513",
            "municipio": "PACHO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "518",
            "municipio": "PAIME"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "524",
            "municipio": "PANDI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "530",
            "municipio": "PARATEBUENO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "535",
            "municipio": "PASCA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "572",
            "municipio": "PUERTO SALGAR"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "580",
            "municipio": "PULI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "592",
            "municipio": "QUEBRADANEGRA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "594",
            "municipio": "QUETAME"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "596",
            "municipio": "QUIPILE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "599",
            "municipio": "APULO (RAFAEL REYES)"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "612",
            "municipio": "RICAURTE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "645",
            "municipio": "SAN  ANTONIO DELTEQUENDAMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "649",
            "municipio": "SAN BERNARDO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "653",
            "municipio": "SAN CAYETANO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "658",
            "municipio": "SAN FRANCISCO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "662",
            "municipio": "SAN JUAN DE RIOSECO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "718",
            "municipio": "SASAIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "736",
            "municipio": "SESQUILE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "740",
            "municipio": "SIBATE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "743",
            "municipio": "SILVANIA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "745",
            "municipio": "SIMIJACA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "754",
            "municipio": "SOACHA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "758",
            "municipio": "SOPO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "769",
            "municipio": "SUBACHOQUE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "772",
            "municipio": "SUESCA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "777",
            "municipio": "SUPATA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "779",
            "municipio": "SUSA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "781",
            "municipio": "SUTATAUSA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "785",
            "municipio": "TABIO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "793",
            "municipio": "TAUSA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "797",
            "municipio": "TENA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "799",
            "municipio": "TENJO"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "805",
            "municipio": "TIBACUY"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "807",
            "municipio": "TIBIRITA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "815",
            "municipio": "TOCAIMA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "817",
            "municipio": "TOCANCIPA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "823",
            "municipio": "TOPAIPI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "839",
            "municipio": "UBALA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "841",
            "municipio": "UBAQUE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "843",
            "municipio": "UBATE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "845",
            "municipio": "UNE"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "851",
            "municipio": "UTICA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "862",
            "municipio": "VERGARA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "867",
            "municipio": "VIANI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "871",
            "municipio": "VILLAGOMEZ"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "873",
            "municipio": "VILLAPINZON"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "875",
            "municipio": "VILLETA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "878",
            "municipio": "VIOTA"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "885",
            "municipio": "YACOPI"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "898",
            "municipio": "ZIPACON"
        },
        {
            "coddepartamento": "25",
            "departamento": "Cundinamarca",
            "codmunicipio": "899",
            "municipio": "ZIPAQUIRA"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "001",
            "municipio": "QUIBDO (SAN FRANCISCO DE QUIBDO)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "006",
            "municipio": "ACANDI"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "025",
            "municipio": "ALTO BAUDO (PIE DE PATO)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "050",
            "municipio": "ATRATO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "073",
            "municipio": "BAGADO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "075",
            "municipio": "BAHIA SOLANO (MUTIS)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "077",
            "municipio": "BAJO BAUDO (PIZARRO)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "099",
            "municipio": "BOJAYA (BELLAVISTA)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "135",
            "municipio": "CANTON DE SAN PABLO(MANAGRU)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "205",
            "municipio": "CONDOTO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "245",
            "municipio": "EL CARMEN DE ATRATO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "250",
            "municipio": "LITORAL DEL BAJO SAN JUAN (SANTA GENOVEVA DE DOCORDO)"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "361",
            "municipio": "ISTMINA"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "372",
            "municipio": "JURADO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "413",
            "municipio": "LLORO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "425",
            "municipio": "MEDIO ATRATO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "430",
            "municipio": "MEDIO BAUDO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "491",
            "municipio": "NOVITA"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "495",
            "municipio": "NUQUI"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "600",
            "municipio": "RIOQUITO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "615",
            "municipio": "RIOSUCIO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "660",
            "municipio": "SAN JOSE DEL PALMAR"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "745",
            "municipio": "SIPI"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "787",
            "municipio": "TADO"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "800",
            "municipio": "UNGUIA"
        },
        {
            "coddepartamento": "27",
            "departamento": "Choco",
            "codmunicipio": "810",
            "municipio": "UNION PANAMERICANA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "001",
            "municipio": "NEIVA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "006",
            "municipio": "ACEVEDO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "013",
            "municipio": "AGRADO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "016",
            "municipio": "AIPE"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "020",
            "municipio": "ALGECIRAS"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "026",
            "municipio": "ALTAMIRA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "078",
            "municipio": "BARAYA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "132",
            "municipio": "CAMPOALEGRE"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "206",
            "municipio": "COLOMBIA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "244",
            "municipio": "ELIAS"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "298",
            "municipio": "GARZON"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "306",
            "municipio": "GIGANTE"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "319",
            "municipio": "GUADALUPE"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "349",
            "municipio": "HOBO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "357",
            "municipio": "IQUIRA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "359",
            "municipio": "ISNOS (SAN JOSE DE ISNOS)"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "378",
            "municipio": "LA ARGENTINA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "396",
            "municipio": "LA PLATA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "483",
            "municipio": "NATAGA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "503",
            "municipio": "OPORAPA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "518",
            "municipio": "PAICOL"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "524",
            "municipio": "PALERMO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "530",
            "municipio": "PALESTINA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "548",
            "municipio": "PITAL"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "551",
            "municipio": "PITALITO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "615",
            "municipio": "RIVERA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "660",
            "municipio": "SALADOBLANCO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "668",
            "municipio": "SAN AGUSTIN"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "676",
            "municipio": "SANTA MARIA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "770",
            "municipio": "SUAZA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "791",
            "municipio": "TARQUI"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "797",
            "municipio": "TESALIA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "799",
            "municipio": "TELLO"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "801",
            "municipio": "TERUEL"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "807",
            "municipio": "TIMANA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "872",
            "municipio": "VILLAVIEJA"
        },
        {
            "coddepartamento": "41",
            "departamento": "Huila",
            "codmunicipio": "885",
            "municipio": "YAGUARA"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "001",
            "municipio": "RIOHACHA"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "078",
            "municipio": "BARRANCAS"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "090",
            "municipio": "DIBULLA"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "098",
            "municipio": "DISTRACCION"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "110",
            "municipio": "EL MOLINO"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "279",
            "municipio": "FONSECA"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "378",
            "municipio": "HATONUEVO"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "420",
            "municipio": "LA JAGUA DEL PILAR"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "430",
            "municipio": "MAICAO"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "560",
            "municipio": "MANAURE"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "650",
            "municipio": "SAN JUAN DEL CESAR"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "847",
            "municipio": "URIBIA"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "855",
            "municipio": "URUMITA"
        },
        {
            "coddepartamento": "44",
            "departamento": "La Guajira",
            "codmunicipio": "874",
            "municipio": "VILLANUEVA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "001",
            "municipio": "SANTA MARTA (DISTRITO TURISTICO, CULTURAL E HISTORICODE SANTAMARTA)"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "030",
            "municipio": "ALGARROBO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "053",
            "municipio": "ARACATACA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "058",
            "municipio": "ARIGUANI (EL DIFICIL)"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "161",
            "municipio": "CERRO SAN ANTONIO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "170",
            "municipio": "CHIVOLO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "189",
            "municipio": "CIENAGA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "205",
            "municipio": "CONCORDIA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "245",
            "municipio": "EL BANCO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "258",
            "municipio": "EL PIÑON"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "268",
            "municipio": "EL RETEN"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "288",
            "municipio": "FUNDACION"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "318",
            "municipio": "GUAMAL"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "541",
            "municipio": "PEDRAZA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "545",
            "municipio": "PIJIÑO DEL CARMEN(PIJIÑO)"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "551",
            "municipio": "PIVIJAY"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "555",
            "municipio": "PLATO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "570",
            "municipio": "PUEBLOVIEJO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "605",
            "municipio": "REMOLINO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "660",
            "municipio": "SABANAS DE SAN ANGEL"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "675",
            "municipio": "SALAMINA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "692",
            "municipio": "SAN SEBASTIAN DEBUENAVISTA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "703",
            "municipio": "SAN ZENON"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "707",
            "municipio": "SANTA ANA"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "745",
            "municipio": "SITIONUEVO"
        },
        {
            "coddepartamento": "47",
            "departamento": "Magdalena",
            "codmunicipio": "798",
            "municipio": "TENERIFE"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "001",
            "municipio": "VILLAVICENCIO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "006",
            "municipio": "ACACIAS"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "110",
            "municipio": "BARRANCA DE UPIA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "124",
            "municipio": "CABUYARO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "150",
            "municipio": "CASTILLA LA NUEVA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "223",
            "municipio": "SAN LUIS DE CUBARRAL"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "226",
            "municipio": "CUMARAL"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "245",
            "municipio": "EL CALVARIO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "251",
            "municipio": "EL CASTILLO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "270",
            "municipio": "EL DORADO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "287",
            "municipio": "FUENTE DE ORO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "313",
            "municipio": "GRANADA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "318",
            "municipio": "GUAMAL"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "325",
            "municipio": "MAPIRIPAN"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "330",
            "municipio": "MESETAS"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "350",
            "municipio": "LA MACARENA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "370",
            "municipio": "LA URIBE"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "400",
            "municipio": "LEJANIAS"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "450",
            "municipio": "PUERTO CONCORDIA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "568",
            "municipio": "PUERTO GAITAN"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "573",
            "municipio": "PUERTO LOPEZ"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "577",
            "municipio": "PUERTO LLERAS"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "590",
            "municipio": "PUERTO RICO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "606",
            "municipio": "RESTREPO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "680",
            "municipio": "SAN CARLOS DE GUAROA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "683",
            "municipio": "SAN  JUAN DE ARAMA"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "686",
            "municipio": "SAN JUANITO"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "689",
            "municipio": "SAN MARTIN"
        },
        {
            "coddepartamento": "50",
            "departamento": "Meta",
            "codmunicipio": "711",
            "municipio": "VISTAHERMOSA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "001",
            "municipio": "PASTO (SAN JUAN DEPASTO)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "019",
            "municipio": "ALBAN (SAN JOSE)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "022",
            "municipio": "ALDANA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "036",
            "municipio": "ANCUYA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "051",
            "municipio": "ARBOLEDA (BERRUECOS)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "079",
            "municipio": "BARBACOAS"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "083",
            "municipio": "BELEN"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "110",
            "municipio": "BUESACO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "203",
            "municipio": "COLON (GENOVA)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "207",
            "municipio": "CONSACA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "210",
            "municipio": "CONTADERO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "215",
            "municipio": "CORDOBA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "224",
            "municipio": "CUASPUD (CARLOSAMA)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "227",
            "municipio": "CUMBAL"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "233",
            "municipio": "CUMBITARA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "240",
            "municipio": "CHACHAGUI"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "250",
            "municipio": "EL CHARCO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "254",
            "municipio": "EL PEÑOL"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "256",
            "municipio": "EL ROSARIO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "258",
            "municipio": "EL TABLON"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "260",
            "municipio": "EL TAMBO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "287",
            "municipio": "FUNES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "317",
            "municipio": "GUACHUCAL"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "320",
            "municipio": "GUAITARILLA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "323",
            "municipio": "GUALMATAN"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "352",
            "municipio": "ILES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "354",
            "municipio": "IMUES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "356",
            "municipio": "IPIALES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "378",
            "municipio": "LA CRUZ"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "381",
            "municipio": "LA FLORIDA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "385",
            "municipio": "LA LLANADA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "390",
            "municipio": "LA TOLA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "399",
            "municipio": "LA UNION"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "405",
            "municipio": "LEIVA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "411",
            "municipio": "LINARES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "418",
            "municipio": "LOS ANDES (SOTOMAYOR)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "427",
            "municipio": "MAGUI (PAYAN)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "435",
            "municipio": "MALLAMA (PIEDRANCHA)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "473",
            "municipio": "MOSQUERA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "490",
            "municipio": "OLAYA HERRERA (BOCASDE SATINGA)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "506",
            "municipio": "OSPINA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "520",
            "municipio": "FRANCISCO PIZARRO(SALAHONDA)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "540",
            "municipio": "POLICARPA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "560",
            "municipio": "POTOSI"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "565",
            "municipio": "PROVIDENCIA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "573",
            "municipio": "PUERRES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "585",
            "municipio": "PUPIALES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "612",
            "municipio": "RICAURTE"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "621",
            "municipio": "ROBERTO PAYAN (SANJOSE)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "678",
            "municipio": "SAMANIEGO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "683",
            "municipio": "SANDONA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "685",
            "municipio": "SAN BERNARDO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "687",
            "municipio": "SAN LORENZO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "693",
            "municipio": "SAN PABLO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "694",
            "municipio": "SAN PEDRO DE CARTAGO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "696",
            "municipio": "SANTA BARBARA(ISCUANDE)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "699",
            "municipio": "SANTA CRUZ (GUACHAVES)"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "720",
            "municipio": "SAPUYES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "786",
            "municipio": "TAMINANGO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "788",
            "municipio": "TANGUA"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "835",
            "municipio": "TUMACO"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "838",
            "municipio": "TUQUERRES"
        },
        {
            "coddepartamento": "52",
            "departamento": "Nariño",
            "codmunicipio": "885",
            "municipio": "YACUANQUER"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "001",
            "municipio": "CUCUTA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "003",
            "municipio": "ABREGO"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "051",
            "municipio": "ARBOLEDAS"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "099",
            "municipio": "BOCHALEMA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "109",
            "municipio": "BUCARASICA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "125",
            "municipio": "CACOTA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "128",
            "municipio": "CACHIRA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "172",
            "municipio": "CHINACOTA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "174",
            "municipio": "CHITAGA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "206",
            "municipio": "CONVENCION"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "223",
            "municipio": "CUCUTILLA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "239",
            "municipio": "DURANIA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "245",
            "municipio": "EL CARMEN"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "250",
            "municipio": "EL TARRA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "261",
            "municipio": "EL ZULIA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "313",
            "municipio": "GRAMALOTE"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "344",
            "municipio": "HACARI"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "347",
            "municipio": "HERRAN"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "377",
            "municipio": "LABATECA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "385",
            "municipio": "LA ESPERANZA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "398",
            "municipio": "LA PLAYA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "405",
            "municipio": "LOS PATIOS"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "418",
            "municipio": "LOURDES"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "480",
            "municipio": "MUTISCUA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "498",
            "municipio": "OCAÑA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "518",
            "municipio": "PAMPLONA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "520",
            "municipio": "PAMPLONITA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "553",
            "municipio": "PUERTO SANTANDER"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "599",
            "municipio": "RAGONVALIA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "660",
            "municipio": "SALAZAR"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "670",
            "municipio": "SAN CALIXTO"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "673",
            "municipio": "SAN CAYETANO"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "680",
            "municipio": "SANTIAGO"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "720",
            "municipio": "SARDINATA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "743",
            "municipio": "SILOS"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "800",
            "municipio": "TEORAMA"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "810",
            "municipio": "TIBU"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "820",
            "municipio": "TOLEDO"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "871",
            "municipio": "VILLACARO"
        },
        {
            "coddepartamento": "54",
            "departamento": "Norte de Santander",
            "codmunicipio": "874",
            "municipio": "VILLA DEL ROSARIO"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "001",
            "municipio": "ARMENIA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "111",
            "municipio": "BUENAVISTA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "130",
            "municipio": "CALARCA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "190",
            "municipio": "CIRCASIA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "212",
            "municipio": "CORDOBA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "272",
            "municipio": "FILANDIA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "302",
            "municipio": "GENOVA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "401",
            "municipio": "LA TEBAIDA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "470",
            "municipio": "MONTENEGRO"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "548",
            "municipio": "PIJAO"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "594",
            "municipio": "QUIMBAYA"
        },
        {
            "coddepartamento": "63",
            "departamento": "Quindio",
            "codmunicipio": "690",
            "municipio": "SALENTO"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "001",
            "municipio": "PEREIRA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "045",
            "municipio": "APIA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "075",
            "municipio": "BALBOA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "088",
            "municipio": "BELEN DE UMBRIA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "170",
            "municipio": "DOS QUEBRADAS"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "318",
            "municipio": "GUATICA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "383",
            "municipio": "LA CELIA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "400",
            "municipio": "LA VIRGINIA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "440",
            "municipio": "MARSELLA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "456",
            "municipio": "MISTRATO"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "572",
            "municipio": "PUEBLO RICO"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "594",
            "municipio": "QUINCHIA"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "682",
            "municipio": "SANTA ROSA DE CABAL"
        },
        {
            "coddepartamento": "66",
            "departamento": "Risaralda",
            "codmunicipio": "687",
            "municipio": "SANTUARIO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "001",
            "municipio": "BUCARAMANGA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "013",
            "municipio": "AGUADA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "020",
            "municipio": "ALBANIA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "051",
            "municipio": "ARATOCA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "077",
            "municipio": "BARBOSA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "079",
            "municipio": "BARICHARA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "081",
            "municipio": "BARRANCABERMEJA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "092",
            "municipio": "BETULIA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "101",
            "municipio": "BOLIVAR"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "121",
            "municipio": "CABRERA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "132",
            "municipio": "CALIFORNIA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "147",
            "municipio": "CAPITANEJO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "152",
            "municipio": "CARCASI"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "160",
            "municipio": "CEPITA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "162",
            "municipio": "CERRITO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "167",
            "municipio": "CHARALA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "169",
            "municipio": "CHARTA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "176",
            "municipio": "CHIMA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "179",
            "municipio": "CHIPATA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "190",
            "municipio": "CIMITARRA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "207",
            "municipio": "CONCEPCION"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "209",
            "municipio": "CONFINES"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "211",
            "municipio": "CONTRATACION"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "217",
            "municipio": "COROMORO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "229",
            "municipio": "CURITI"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "235",
            "municipio": "EL CARMEN DE CHUCURY"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "245",
            "municipio": "EL GUACAMAYO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "250",
            "municipio": "EL PEÑON"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "255",
            "municipio": "EL PLAYON"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "264",
            "municipio": "ENCINO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "266",
            "municipio": "ENCISO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "271",
            "municipio": "FLORIAN"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "276",
            "municipio": "FLORIDABLANCA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "296",
            "municipio": "GALAN"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "298",
            "municipio": "GAMBITA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "307",
            "municipio": "GIRON"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "318",
            "municipio": "GUACA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "320",
            "municipio": "GUADALUPE"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "322",
            "municipio": "GUAPOTA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "324",
            "municipio": "GUAVATA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "327",
            "municipio": "GUEPSA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "344",
            "municipio": "HATO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "368",
            "municipio": "JESUS MARIA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "370",
            "municipio": "JORDAN"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "377",
            "municipio": "LA BELLEZA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "385",
            "municipio": "LANDAZURI"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "397",
            "municipio": "LA PAZ"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "406",
            "municipio": "LEBRIJA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "418",
            "municipio": "LOS SANTOS"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "425",
            "municipio": "MACARAVITA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "432",
            "municipio": "MALAGA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "444",
            "municipio": "MATANZA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "464",
            "municipio": "MOGOTES"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "468",
            "municipio": "MOLAGAVITA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "498",
            "municipio": "OCAMONTE"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "500",
            "municipio": "OIBA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "502",
            "municipio": "ONZAGA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "522",
            "municipio": "PALMAR"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "524",
            "municipio": "PALMAS DEL SOCORRO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "533",
            "municipio": "PARAMO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "547",
            "municipio": "PIEDECUESTA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "549",
            "municipio": "PINCHOTE"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "572",
            "municipio": "PUENTE NACIONAL"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "573",
            "municipio": "PUERTO PARRA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "575",
            "municipio": "PUERTO WILCHES"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "615",
            "municipio": "RIONEGRO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "655",
            "municipio": "SABANA DE TORRES"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "669",
            "municipio": "SAN ANDRES"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "673",
            "municipio": "SAN BENITO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "679",
            "municipio": "SAN GIL"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "682",
            "municipio": "SAN JOAQUIN"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "684",
            "municipio": "SAN JOSE DE MIRANDA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "686",
            "municipio": "SAN MIGUEL"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "689",
            "municipio": "SAN VICENTE DE CHUCURI"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "705",
            "municipio": "SANTA BARBARA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "720",
            "municipio": "SANTA HELENA DEL OPON"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "745",
            "municipio": "SIMACOTA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "755",
            "municipio": "SOCORRO"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "770",
            "municipio": "SUAITA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "773",
            "municipio": "SUCRE"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "780",
            "municipio": "SURATA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "820",
            "municipio": "TONA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "855",
            "municipio": "VALLE SAN JOSE"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "861",
            "municipio": "VELEZ"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "867",
            "municipio": "VETAS"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "872",
            "municipio": "VILLANUEVA"
        },
        {
            "coddepartamento": "68",
            "departamento": "Santander",
            "codmunicipio": "895",
            "municipio": "ZAPATOCA"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "001",
            "municipio": "SINCELEJO"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "110",
            "municipio": "BUENAVISTA"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "124",
            "municipio": "CAIMITO"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "204",
            "municipio": "COLOSO (RICAURTE)"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "215",
            "municipio": "COROZAL"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "230",
            "municipio": "CHALAN"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "235",
            "municipio": "GALERAS (NUEVAGRANADA)"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "265",
            "municipio": "GUARANDA"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "400",
            "municipio": "LA UNION"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "418",
            "municipio": "LOS PALMITOS"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "429",
            "municipio": "MAJAGUAL"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "473",
            "municipio": "MORROA"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "508",
            "municipio": "OVEJAS"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "523",
            "municipio": "PALMITO"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "670",
            "municipio": "SAMPUES"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "678",
            "municipio": "SAN BENITO ABAD"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "702",
            "municipio": "SAN JUAN DE BETULIA"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "708",
            "municipio": "SAN MARCOS"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "713",
            "municipio": "SAN ONOFRE"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "717",
            "municipio": "SAN PEDRO"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "742",
            "municipio": "SINCE"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "771",
            "municipio": "SUCRE"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "820",
            "municipio": "TOLU"
        },
        {
            "coddepartamento": "70",
            "departamento": "Sucre",
            "codmunicipio": "823",
            "municipio": "TOLUVIEJO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "001",
            "municipio": "IBAGUE"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "024",
            "municipio": "ALPUJARRA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "026",
            "municipio": "ALVARADO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "030",
            "municipio": "AMBALEMA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "043",
            "municipio": "ANZOATEGUI"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "055",
            "municipio": "ARMERO (GUAYABAL)"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "067",
            "municipio": "ATACO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "124",
            "municipio": "CAJAMARCA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "148",
            "municipio": "CARMEN APICALA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "152",
            "municipio": "CASABIANCA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "168",
            "municipio": "CHAPARRAL"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "200",
            "municipio": "COELLO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "217",
            "municipio": "COYAIMA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "226",
            "municipio": "CUNDAY"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "236",
            "municipio": "DOLORES"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "268",
            "municipio": "ESPINAL"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "270",
            "municipio": "FALAN"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "275",
            "municipio": "FLANDES"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "283",
            "municipio": "FRESNO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "319",
            "municipio": "GUAMO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "347",
            "municipio": "HERVEO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "349",
            "municipio": "HONDA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "352",
            "municipio": "ICONONZO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "408",
            "municipio": "LERIDA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "411",
            "municipio": "LIBANO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "443",
            "municipio": "MARIQUITA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "449",
            "municipio": "MELGAR"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "461",
            "municipio": "MURILLO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "483",
            "municipio": "NATAGAIMA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "504",
            "municipio": "ORTEGA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "520",
            "municipio": "PALOCABILDO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "547",
            "municipio": "PIEDRAS"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "555",
            "municipio": "PLANADAS"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "563",
            "municipio": "PRADO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "585",
            "municipio": "PURIFICACION"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "616",
            "municipio": "RIOBLANCO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "622",
            "municipio": "RONCESVALLES"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "624",
            "municipio": "ROVIRA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "671",
            "municipio": "SALDAÑA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "675",
            "municipio": "SAN ANTONIO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "678",
            "municipio": "SAN LUIS"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "686",
            "municipio": "SANTA ISABEL"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "770",
            "municipio": "SUAREZ"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "854",
            "municipio": "VALLE DE SAN JUAN"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "861",
            "municipio": "VENADILLO"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "870",
            "municipio": "VILLAHERMOSA"
        },
        {
            "coddepartamento": "73",
            "departamento": "Tolima",
            "codmunicipio": "873",
            "municipio": "VILLARRICA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "001",
            "municipio": "CALI (SANTIAGO DE CALI)"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "020",
            "municipio": "ALCALA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "036",
            "municipio": "ANDALUCIA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "041",
            "municipio": "ANSERMANUEVO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "054",
            "municipio": "ARGELIA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "100",
            "municipio": "BOLIVAR"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "109",
            "municipio": "BUENAVENTURA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "111",
            "municipio": "BUGA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "113",
            "municipio": "BUGALAGRANDE"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "122",
            "municipio": "CAICEDONIA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "126",
            "municipio": "CALIMA (DARIEN)"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "130",
            "municipio": "CANDELARIA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "147",
            "municipio": "CARTAGO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "233",
            "municipio": "DAGUA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "243",
            "municipio": "EL AGUILA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "246",
            "municipio": "EL CAIRO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "248",
            "municipio": "EL CERRITO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "250",
            "municipio": "EL DOVIO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "275",
            "municipio": "FLORIDA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "306",
            "municipio": "GINEBRA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "318",
            "municipio": "GUACARI"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "364",
            "municipio": "JAMUNDI"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "377",
            "municipio": "LA CUMBRE"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "400",
            "municipio": "LA UNION"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "403",
            "municipio": "LA VICTORIA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "497",
            "municipio": "OBANDO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "520",
            "municipio": "PALMIRA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "563",
            "municipio": "PRADERA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "606",
            "municipio": "RESTREPO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "616",
            "municipio": "RIOFRIO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "622",
            "municipio": "ROLDANILLO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "670",
            "municipio": "SAN PEDRO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "736",
            "municipio": "SEVILLA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "823",
            "municipio": "TORO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "828",
            "municipio": "TRUJILLO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "834",
            "municipio": "TULUA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "845",
            "municipio": "ULLOA"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "863",
            "municipio": "VERSALLES"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "869",
            "municipio": "VIJES"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "890",
            "municipio": "YOTOCO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "892",
            "municipio": "YUMBO"
        },
        {
            "coddepartamento": "76",
            "departamento": "Valle",
            "codmunicipio": "895",
            "municipio": "ZARZAL"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "001",
            "municipio": "ARAUCA"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "065",
            "municipio": "ARAUQUITA"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "220",
            "municipio": "CRAVO NORTE"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "300",
            "municipio": "FORTUL"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "591",
            "municipio": "PUERTO RONDON"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "736",
            "municipio": "SARAVENA"
        },
        {
            "coddepartamento": "81",
            "departamento": "Arauca",
            "codmunicipio": "794",
            "municipio": "TAME"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "001",
            "municipio": "YOPAL"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "010",
            "municipio": "AGUAZUL"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "015",
            "municipio": "CHAMEZA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "125",
            "municipio": "HATO COROZAL"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "136",
            "municipio": "LA SALINA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "139",
            "municipio": "MANI"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "162",
            "municipio": "MONTERREY"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "225",
            "municipio": "NUNCHIA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "230",
            "municipio": "OROCUE"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "250",
            "municipio": "PAZ DE ARIPORO"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "263",
            "municipio": "PORE"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "279",
            "municipio": "RECETOR"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "300",
            "municipio": "SABANALARGA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "315",
            "municipio": "SACAMA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "325",
            "municipio": "SAN LUIS DE PALENQUE"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "400",
            "municipio": "TAMARA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "410",
            "municipio": "TAURAMENA"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "430",
            "municipio": "TRINIDAD"
        },
        {
            "coddepartamento": "85",
            "departamento": "Casanare",
            "codmunicipio": "440",
            "municipio": "VILLANUEVA"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "001",
            "municipio": "MOCOA"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "219",
            "municipio": "COLON"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "320",
            "municipio": "ORITO"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "568",
            "municipio": "PUERTO ASIS"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "569",
            "municipio": "PUERTO CAICEDO"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "571",
            "municipio": "PUERTO GUZMAN"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "573",
            "municipio": "PUERTO LEGUIZAMO"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "749",
            "municipio": "SIBUNDOY"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "755",
            "municipio": "SAN FRANCISCO"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "757",
            "municipio": "SAN MIGUEL (LA DORADA)"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "760",
            "municipio": "SANTIAGO"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "865",
            "municipio": "LA HORMIGA (VALLE DELGUAMUEZ)"
        },
        {
            "coddepartamento": "86",
            "departamento": "Putumayo",
            "codmunicipio": "885",
            "municipio": "VILLAGARZON"
        },
        {
            "coddepartamento": "88",
            "departamento": "San Andres",
            "codmunicipio": "001",
            "municipio": "SAN ANDRES"
        },
        {
            "coddepartamento": "88",
            "departamento": "San Andres",
            "codmunicipio": "564",
            "municipio": "PROVIDENCIA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "001",
            "municipio": "LETICIA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "263",
            "municipio": "EL ENCANTO"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "405",
            "municipio": "LA CHORRERA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "407",
            "municipio": "LA PEDRERA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "430",
            "municipio": "LA VICTORIA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "460",
            "municipio": "MIRITI-PARANA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "530",
            "municipio": "PUERTO ALEGRIA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "536",
            "municipio": "PUERTO ARICA"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "540",
            "municipio": "PUERTO NARIÑO"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "669",
            "municipio": "PUERTO SANTANDER"
        },
        {
            "coddepartamento": "91",
            "departamento": "Amazonas",
            "codmunicipio": "798",
            "municipio": "TARAPACA"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "001",
            "municipio": "PUERTO INIRIDA"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "343",
            "municipio": "BARRANCO MINAS"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "883",
            "municipio": "SAN FELIPE"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "884",
            "municipio": "PUERTO COLOMBIA"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "885",
            "municipio": "LA GUADALUPE"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "886",
            "municipio": "CACAHUAL"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "887",
            "municipio": "PANA PANA (CAMPOALEGRE)"
        },
        {
            "coddepartamento": "94",
            "departamento": "Guainia",
            "codmunicipio": "888",
            "municipio": "MORICHAL (MORICHALNUEVO)"
        },
        {
            "coddepartamento": "95",
            "departamento": "Guaviare",
            "codmunicipio": "001",
            "municipio": "SAN JOSE DEL GUAVIARE"
        },
        {
            "coddepartamento": "95",
            "departamento": "Guaviare",
            "codmunicipio": "015",
            "municipio": "CALAMAR"
        },
        {
            "coddepartamento": "95",
            "departamento": "Guaviare",
            "codmunicipio": "025",
            "municipio": "EL RETORNO"
        },
        {
            "coddepartamento": "95",
            "departamento": "Guaviare",
            "codmunicipio": "200",
            "municipio": "MIRAFLORES"
        },
        {
            "coddepartamento": "97",
            "departamento": "Vaupes",
            "codmunicipio": "001",
            "municipio": "MITU"
        },
        {
            "coddepartamento": "97",
            "departamento": "Vaupes",
            "codmunicipio": "161",
            "municipio": "CARURU"
        },
        {
            "coddepartamento": "97",
            "departamento": "Vaupes",
            "codmunicipio": "511",
            "municipio": "PACOA"
        },
        {
            "coddepartamento": "97",
            "departamento": "Vaupes",
            "codmunicipio": "666",
            "municipio": "TARAIRA"
        },
        {
            "coddepartamento": "97",
            "departamento": "Vaupes",
            "codmunicipio": "777",
            "municipio": "PAPUNAUA (MORICHAL)"
        },
        {
            "coddepartamento": "97",
            "departamento": "Vaupes",
            "codmunicipio": "889",
            "municipio": "YAVARATE"
        },
        {
            "coddepartamento": "99",
            "departamento": "Vichada",
            "codmunicipio": "001",
            "municipio": "PUERTO CARREÑO"
        },
        {
            "coddepartamento": "99",
            "departamento": "Vichada",
            "codmunicipio": "524",
            "municipio": "LA PRIMAVERA"
        },
        {
            "coddepartamento": "99",
            "departamento": "Vichada",
            "codmunicipio": "572",
            "municipio": "SANTA RITA"
        },
        {
            "coddepartamento": "99",
            "departamento": "Vichada",
            "codmunicipio": "666",
            "municipio": "SANTA ROSALIA"
        },
        {
            "coddepartamento": "99",
            "departamento": "Vichada",
            "codmunicipio": "760",
            "municipio": "SAN JOSE DE OCUNE"
        },
        {
            "coddepartamento": "99",
            "departamento": "Vichada",
            "codmunicipio": "773",
            "municipio": "CUMARIBO"
        }
    ]`;

