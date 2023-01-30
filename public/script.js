var map;
var tokyo;

function initMap() {
  tokyo = new google.maps.LatLng(35.689614,139.691585);

  var opts = {
    zoom: 15,
    center: tokyo
  };

  map = new google.maps.Map(document.getElementById("map"), opts);
}

function getMyPlace() {
  var output = document.getElementById("result");
  if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
    output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;//緯度
    var longitude = position.coords.longitude;//経度
    //緯度経度をGAS用に設定
    output.innerHTML = '<div>緯度 ' + latitude + '°<input type="hidden" id="latitude" name="latitude" required></div><div>経度 ' + longitude + '°<input type="hidden" id="longitude" name="longitude" required></div>';
    var element1 = document.getElementById('latitude');
    element1.value = latitude;
    var element2 = document.getElementById('longitude');
    element2.value = longitude;
    // 位置情報
    var latlng = new google.maps.LatLng( latitude , longitude ) ;
    // Google Mapsに書き出し
    var map = new google.maps.Map( document.getElementById( 'map' ) , {
        zoom: 15 ,// ズーム値
        center: latlng ,// 中心座標
    } ) ;
    // マーカーの新規出力
    new google.maps.Marker( {
        map: map ,
        position: latlng ,
    } ) ;
  };
  function error() {
    //エラーの場合
    output.innerHTML = "座標位置を取得できません";
  };
  navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
}