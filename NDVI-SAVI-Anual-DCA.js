//=====================Datos de entrada para el estudio del ecosistema de duna costera (DC) y la densidad de la coberura vegetal
//=====================en un periodo de 10 años dentro de la Reserva de la Biosfera de Sian Ka´an (RBSK), Quintana Roo, México.====================================/
//=====================(Elaboración y modificación estructural de codigos por MMZC. Eloy Gayosso Soto).===========================================================/

//=====================Esta obra se ecuentra bajo los términos de la licencia GNU General Public License v3.0.======================================================/
//=====================Para obtener una copia, consulte https://choosealicense.com/licenses/gpl-3.0/ =============================================================/

//===============================https://courses.spatialthoughts.com/end-to-end-gee.html.=======================================================================/

//===================================1.Periodo de estudio 2011-2020 (10 años).================================================================/

var StartYear = 2011, EndYear = 2020;

//======================================2.Cargar Área de estudio, Zona Norte y Sur de la RBSK.====================================================/

var ZN = ee.FeatureCollection ('users/veronica78mere/ZN');
var ZS = ee.FeatureCollection ('users/veronica78mere/ZS');

//=========================2.1. Determinando la superficie de cada zona de estudio.====================================/

var ZNarea= ZN.geometry().area().divide(10000);
var ZSarea= ZS.geometry().area().divide(10000);

//======================================2.2. Imprimiendo superficies áreas de estudio.===============================/

print ('Superficie ZN ha', ZNarea);
print ('Superficie ZS ha', ZSarea);

//======================================2.3.Unión de zonas de estudio.============================================================================/

var zonas = ee.FeatureCollection (ZN.merge(ZS));

////=======================================3.Código de la librería oficial de GEE para el enmascaramiento de nubes y sombras.=======================/
//------------------------------------------------------------------------------------------------------------------------------------------------/
//=================================Fuente de estructura de codigo de enmascaameinto de nube para este catalago: ==================================/
//================================https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LE07_C01_T1_SR?hl=en ======================/
//----------------------------------------------------------------------------------------------------------------------------------------------/

//==Se crea la función cloudMaskL457 para enmascarar nubes y sombra de nubes, mediante los valores de pixel de la banda QA_PIXEL

var cloudMaskC2L7 = function(image) {
  var cloud = (1 << 3)
  var cloudconfidence = (1 << 9)
  var cloudShadow = (1 << 4)
  var qa = image.select('QA_PIXEL');//La banda QA_Pixel, es una banda de evaluación de la calidad de píxeles, generada a partir del algoritmo CFMASK para el procesamiento de eliminación de nubes. 
  //Esta puede generar una nueva imagen de banda única.
//// La capa de nubes se representa como el tercer lugar, la confianza de la capa de nubes es 8-9 y la sombra de las nubes es el cuarto lugar
////// Seleccione los píxeles que tienen nubes y la confianza de las nubes es media y están cubiertos por sombras de nubes.
  var cloud02 = qa.bitwiseAnd(cloud)
    .and(qa.bitwiseAnd(cloudconfidence))
    .or(qa.bitwiseAnd(cloudShadow));
  //Elimina los píxeles de borde que no aparecen en todas las bandas
  var mask2 = image.mask().reduce(ee.Reducer.min());
  // Establezca los píxeles de la nube relacionados con la detección en 0 y la máscara retiene los datos cuya posición no es 0.
  return image.updateMask(cloud02.not()).updateMask(mask2);
}; //96 % de confiabilidad en los datos

/*Para renombrar bandas de interés de la colección L7, y ser empleadas por su nombre..
function renameETM(image) {
return image.select(
		['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7','QA_PIXEL'],
		['blue','green','red','nir','swir1','swir2','QA_PIXEL']
  );
}*/

//===========================4.Para datos anuales.===================================================================================/
 
function scale02(image) {
  var opticalbands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
    return image.addBands(opticalbands, null, true);
}

//=====================================5.Periodos anuales para estimación de Mann-Kendall en R Studio en la vegetación en DC. =====================================================/

//1.=========================================================/

var T1 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2011-01-01' ,'2011-12-31')  
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//2.==========================================================/ 

var T2 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2012-01-01' ,'2012-12-31')  
  .map (cloudMaskC2L7)
  .map(scale02)
 .reduce(ee.Reducer.median())
  .clip(zonas);

//3.===========================================================/

var T3 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2013-01-01' ,'2013-12-31')  
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//4.=============================================================/

var T4 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2014-01-01' ,'2014-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
 .reduce(ee.Reducer.median())
 .clip(zonas);

//5.================================================================/

var T5 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2015-01-01' ,'2015-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//6. ================================================================/

var T6 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2016-01-01', '2016-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);
 
//7. ================================================================/
  
  var T7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2017-01-01', '2017-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//8. ================================================================/  
 
var T8 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2018-01-01', '2018-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//9. ================================================================/  
 
var T9 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2019-01-01', '2019-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//10. ================================================================/  
  
var T10 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2") 
  .filterDate ('2020-01-01', '2020-12-31') 
  .map (cloudMaskC2L7)
  .map(scale02)
  .reduce(ee.Reducer.median())
  .clip(zonas);

//=====================================6. Funciones para el calculo de Índices Multiespectrales de Vegetación (IMV) para del área de estudio en la RBSK.=========/

//========================6.1. Función para estimar el índice NDVI para el periodo 2011-2020, compilando la periodicidad bianualmente.=======================/
//1.====================================================================================================================/
var NDVI1 = T1.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T1.get('system:time_start')).rename('NDVI');
//2.====================================================================================================================/
var NDVI2 = T2.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T2.get('system:time_start')).rename('NDVI');
//3.====================================================================================================================/
var NDVI3 = T3.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T3.get('system:time_start')).rename('NDVI');
//4.====================================================================================================================/
var NDVI4 = T4.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T4.get('system:time_start')).rename('NDVI');
//5.====================================================================================================================/
var NDVI5 = T5.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T5.get('system:time_start')).rename('NDVI');
//6.====================================================================================================================/
var NDVI6 = T6.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T6.get('system:time_start')).rename('NDVI');
//7.====================================================================================================================/
var NDVI7 = T7.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T7.get('system:time_start')).rename('NDVI');
//8.====================================================================================================================/
var NDVI8 = T8.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T8.get('system:time_start')).rename('NDVI');
//9.====================================================================================================================/
var NDVI9 = T9.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T9.get('system:time_start')).rename('NDVI');
//10.====================================================================================================================/
var NDVI10 = T10.normalizedDifference (['SR_B4_median','SR_B3_median']).set('system:time_start', T10.get('system:time_start')).rename('NDVI');

//==========================6.2. Función para estimar el índice SAVI para el periodo 2011-2020, compilando la periodicidad bianualmente.========================/

//1.==============================================================================/
var SAVI1 = T1.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T1.select ('SR_B4_median'),
    'SR_B3': T1.select ('SR_B3_median')})
    // L igual a 1 corresponde a áreas con poca vegetación, 
    // L igual a 0.5 para áreas con vegetación intermedias, 
    // L igual a 0.25 para áreas con vegetación densa.
          //return image.addBands (SAVI1)
 .set('system:time_start',T1 .get('system:time_start')).rename ('SAVI');

//2.=================================================================================/
var SAVI2 = T2.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T2.select ('SR_B4_median'),
    'SR_B3': T2.select ('SR_B3_median')})
 .set('system:time_start', T2.get('system:time_start')).rename ('SAVI');

//3.=================================================================================/
var SAVI3 = T3.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T3.select ('SR_B4_median'),
    'SR_B3': T3.select ('SR_B3_median')})
 .set('system:time_start', T3.get('system:time_start')).rename ('SAVI');

//4.=================================================================================/
var SAVI4 = T4.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T4.select ('SR_B4_median'),
    'SR_B3': T4.select ('SR_B3_median')})
 .set('system:time_start', T4.get('system:time_start')).rename ('SAVI');

//5.==================================================================================/
var SAVI5 = T5.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T5.select ('SR_B4_median'),
    'SR_B3': T5.select ('SR_B3_median')})
 .set('system:time_start', T5.get('system:time_start')).rename ('SAVI');

//6.========================================= Extra 2020-2020==========================================/
var SAVI6 = T6.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T6.select ('SR_B4_median'),
    'SR_B3': T6.select ('SR_B3_median')})
 .set('system:time_start', T6.get('system:time_start')).rename ('SAVI');

//7.==============================================================================/
var SAVI7 = T7.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T7.select ('SR_B4_median'),
    'SR_B3': T7.select ('SR_B3_median')})
    // L igual a 1 corresponde a áreas con poca vegetación, 
    // L igual a 0.5 para áreas con vegetación intermedias, 
    // L igual a 0.25 para áreas con vegetación densa.
          //return image.addBands (SAVI1)
 .set('system:time_start',T7 .get('system:time_start')).rename ('SAVI');

//8.=================================================================================/
var SAVI8 = T8.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T8.select ('SR_B4_median'),
    'SR_B3': T8.select ('SR_B3_median')})
 .set('system:time_start', T8.get('system:time_start')).rename ('SAVI');

//9.=================================================================================/
var SAVI9 = T9.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T9.select ('SR_B4_median'),
    'SR_B3': T9.select ('SR_B3_median')})
 .set('system:time_start', T9.get('system:time_start')).rename ('SAVI');

//10.=================================================================================/
var SAVI10 = T10.expression('float ((SR_B4 - SR_B3) / (SR_B4 + SR_B3 + L) * (1+ L))',{
    'L': 0.5,
    'SR_B4': T10.select ('SR_B4_median'),
    'SR_B3': T10.select ('SR_B3_median')})
 .set('system:time_start', T10.get('system:time_start')).rename ('SAVI');

//==========================================7. Declaracion de paleta de colores.=============/

var palette = ['F6BA10','D4F610', 'B3F455','6AE817', '469D0D'];

//===========================================8.Composición multiteporal (2011-2020) con valores del índice NDVI por un perio de 10 años.============/

var NDVImultitemporal = (NDVI1.addBands(NDVI2).addBands(NDVI3)
                          .addBands (NDVI4).addBands (NDVI5).addBands(NDVI6).addBands(NDVI7)
                          .addBands (NDVI8).addBands (NDVI9).addBands (NDVI10));
 
var band01 = NDVImultitemporal.select('NDVI.*'); //Para representar los valores en histogramas

//============================================9.Composición  multitemporal con el índice SAVI para el periodo 2011-2020.=================/

var SAVImultitemporal = (SAVI1.addBands(SAVI2).addBands(SAVI3)
                            .addBands (SAVI4).addBands (SAVI5).addBands(SAVI6).addBands(SAVI7)
                            .addBands (SAVI8).addBands (SAVI9).addBands (SAVI10));

var band02 = SAVImultitemporal.select('SAVI.*'); //Para representar los valores en histogramas.

//================================================10.Estadisticos descriptivos para NDVI y SAVI para cada zona (ZN-ZS) por bianualidades y para el periodo 2011-2020.=========================/

var reducer1 = ee.Reducer.mean(); //variables y funciones para obtener estadisticos descriptivos.
var reducers = reducer1.combine({reducer2: ee.Reducer.median(), sharedInputs: true})
                       .combine({reducer2: ee.Reducer.stdDev(), sharedInputs: true})
                       .combine({reducer2: ee.Reducer.variance(), sharedInputs: true})
                       .combine({reducer2: ee.Reducer.max(), sharedInputs: true})
                       .combine({reducer2: ee.Reducer.min(), sharedInputs: true});
                               
//1.=========================================Estadisticos descriptivos para el periodo 2011-2020                               
                                
var results_01 =NDVImultitemporal.select('NDVI.*').reduceRegion({reducer: reducers,
                                geometry: ZN,
                                scale: 30,
                                bestEffort: true}); 

//2.=========================================Imprimir en consola los estadisticos descriptivos estimados para NDI en distintos periodos.==============/

print ('Estadisticos_NDVI_ZN', results_01);

//3.=========================================================/

var results_02 =SAVImultitemporal.select('SAVI.*').reduceRegion({reducer: reducers,
                                geometry: ZN,
                                scale: 30,
                                bestEffort: true}); //Estadisticos descriptivos para el periodo 2011-2020


print ('Estadisticos_SAVI_ZN', results_02);

//4.==========================================================/

var results_03 =NDVImultitemporal.select('NDVI.*').reduceRegion({reducer: reducers,
                                geometry: ZS,
                                scale: 30,
                                bestEffort: true});

print ('Estadisticos_NDVI_ZS', results_03);

//5.===========================================================/

var results_04 =SAVImultitemporal.select('SAVI.*').reduceRegion({reducer: reducers,
                                geometry: ZS,
                                scale: 30,
                                bestEffort: true});


print ('Estadisticos_SAVI_ZS', results_04);


//=====================================11. Histogramas de frecuencia de los IVM.=========================================================================================/

//1.==============HIstograma de frecuencias NDVI_ZN.===================/
// Definir las opciones de de visualización del histograma
var opciones = {
  //Título
  title: 'Histograma de Valores NDVI-ZN',
  // tamaño de letra
  fontSize: 15,
  //Título del eje horizontal
  hAxis: {title: 'Distribución Valores NDVI'},
  //Título del eje vertical
  vAxis: {title: 'Frecuencia'},
   minBucketWidth:(-1,0, 1),
  // Colores de las series
  series: {
    0: {color: 'green'},
    }};
 
// Creación del histograma y agregar las opciones de visualización.
 // Definir datos del histograma (imagen, región, resolución espacial en metros)
var histograma01 = ui.Chart.image.histogram(band01 , ZN, 30) //  band01
    // Definir nombres de las series
    .setSeriesNames([ 'NDVI'])
    // Agregar las opciones de histograma definidas previamente
    .setOptions(opciones);
   
 
// Mostrar histograma en la consola.
print(histograma01);

//2.============================HIstograma de frecuencias NDVI_ZS.==============/
var opciones = {
  //Título
  title: 'Histograma de Valores NDVI-ZS',
  // tamaño de letra
  fontSize: 15,
  //Título del eje horizontal
  hAxis: {title: 'Distribución Valores NDVI'},
  //Título del eje vertical
  vAxis: {title: 'Frecuencia'},
   minBucketWidth:(-0.5,1, 0.05),
  // Colores de las series
  series: {
    0: {color: 'blue'},
    }};
 
// Creación del histograma y agregar las opciones de visualización.
 // Definir datos del histograma (imagen, región, resolución espacial en metros)
var histograma02 = ui.Chart.image.histogram(band01, ZS, 30)
    // Definir nombres de las series
    .setSeriesNames([ 'NDVI'])
    // Agregar las opciones de histograma definidas previamente
    .setOptions(opciones);
   
 
// Mostrar histograma en la consola.
print(histograma02);

//3.============================HIstograma de frecuencias SAVI_ZN.==============/
var opciones = {
  //Título
  title: 'Histograma de Valores SAVI-ZN',
  // tamaño de letra
  fontSize: 15,
  //Título del eje horizontal
  hAxis: {title: 'Distribución Valores SAVI'},
  //Título del eje vertical
  vAxis: {title: 'Frecuencia'},
   minBucketWidth:(-0.5,1, 0.05),
  // Colores de las series
  series: {
    0: {color: 'yellow'},
    }};
 
// Creación del histograma y agregar las opciones de visualización.
 // Definir datos del histograma (imagen, región, resolución espacial en metros)
var histograma03 = ui.Chart.image.histogram(band02, ZN, 30)
    // Definir nombres de las series
    .setSeriesNames([ 'SAVI'])
    // Agregar las opciones de histograma definidas previamente
    .setOptions(opciones);
   
 // Mostrar histograma en la consola.
print(histograma03);

//4.============================HIstograma de frecuencias SAVI_ZS.==============/
var opciones = {
  //Título
  title: 'Histograma de Valores SAVI-ZS',
  // tamaño de letra
  fontSize: 15,
  //Título del eje horizontal
  hAxis: {title: 'Distribución Valores SAVI'},
  //Título del eje vertical
  vAxis: {title: 'Frecuencia'},
   minBucketWidth:(-0.5,1, 0.05),
  // Colores de las series
  series: {
    0: {color: 'orange'},
    }};
 
// Creación del histograma y agregar las opciones de visualización.
 // Definir datos del histograma (imagen, región, resolución espacial en metros)
var histograma04 = ui.Chart.image.histogram(band02, ZS, 30)
    // Definir nombres de las series
    .setSeriesNames(['SAVI'])
    // Agregar las opciones de histograma definidas previamente
    .setOptions(opciones);
   
 // Mostrar histograma en la consola.
print(histograma04);

//======================================================12. NDVI Total a Google Drive.==========================/

//-------------------------------------------------------------------------------------------------------------------------------------/  
//===========================12.1. Datos anuales para el periodo 2011-2020 de NDVI en las zonas de estudio (ZN-ZS)======================/

//1. ==========================================2011.===========================================/
Export.image.toDrive({image: NDVI1,
  description: 'Anualidad_NDVI1_2011',
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});
  
//2.=========================================== 2012.===========================================/

Export.image.toDrive({image: NDVI2,
  description: 'Anualidad_NDVI2_2012',
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});

//3.============================================ 2013.===========================================/
  
Export.image.toDrive({image: NDVI3,
  description: 'Anualidad_NDVI3_2013', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
//4.============================================2014.=============================================/ 

Export.image.toDrive({image: NDVI4,
  description: 'Anualidad_NDVI4_2014', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  

//5.=======================================2015.=================================================/
  
Export.image.toDrive({image: NDVI5,
  description: 'Anualidad_NDVI5_2015', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
//6.=======================================2016.=================================================/
  
Export.image.toDrive({image: NDVI6,
  description: 'Anualidad_NDVI6_2016', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
 
//7.=======================================2017.=================================================/
  
Export.image.toDrive({image: NDVI7,
  description: 'Anualidad_NDVI7_2017', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
   
  
//8.=======================================2018.=================================================/
  
Export.image.toDrive({image: NDVI8,
  description: 'Anualidad_NDVI8_2018', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
  
//9.=======================================2019.=================================================/
  
Export.image.toDrive({image: NDVI9,
  description: 'Anualidad_NDVI9_2019', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
  
//10.=======================================2020.=================================================/
  
Export.image.toDrive({image: NDVI10,
  description: 'Anualidad_NDVI10_2020', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
  //--------------------------------------------------------------------------------------------------------/

//================================12.2. NDVI sin reclasificar.===============================/
Export.image.toDrive({image: NDVImultitemporal,
  description: 'Total_NDVI_S-R_'+StartYear+'_to_'+EndYear,
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});
  
//************************************************************************************************/

//=================================13. SAVI Total a Google Drive.=============================/

 //================================13.1. Datos anuales para el periodo 2011-2020 de SAVI en las zonas de estudio (ZN-ZS)=============================/

//1.================================2011.=================================/  
  Export.image.toDrive({image: SAVI1,
  description: 'Anualidad_SAVI1__2011',
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});

//2.================================2012.================================/ 
 
Export.image.toDrive({image: SAVI2,
  description: 'Anualidad_SAVI2_2012', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
 maxPixels: 1e13});  
  
//3.==================================2013.=============================/

Export.image.toDrive({image:  SAVI3,
  description: 'Anualidad_SAVI3_2013',
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});
     
//4.==================================2014.==============================/ 

Export.image.toDrive({image:  SAVI4,
  description: 'Anualidad_SAVI4_2014', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});
     
//5.=================================== 2015.=============================/

Export.image.toDrive({image:  SAVI5,
  description: 'Anualidad_SAVI5_2015', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});

//6.=================================== 2016.=============================/

Export.image.toDrive({image:  SAVI6,
  description: 'Anualidad_SAVI6_2016', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});

//5.=================================== 2017.=============================/

Export.image.toDrive({image:  SAVI7,
  description: 'Anualidad_SAVI7_2017', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});
  
//5.=================================== 2018.=============================/

Export.image.toDrive({image:  SAVI8,
  description: 'Anualidad_SAVI8_2018', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
  
//5.=================================== 2019.=============================/

Export.image.toDrive({image:  SAVI9,
  description: 'Anualidad_SAVI9_2019', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});  
 
//5.=================================== 2020.=============================/

Export.image.toDrive({image:  SAVI10,
  description: 'Anualidad_SAVI10_2020', 
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13}); 
 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/

//==================== ===========13.2. SAVI sin reclasificar.=============================================================/
Export.image.toDrive({image: SAVImultitemporal,
  description: 'Total_SAVI_S-R_'+StartYear+'_to_'+EndYear,
  folder: 'GEE',
  scale: 30,
  region: zonas,
  crs: 'EPSG:32616',
  maxPixels: 1e13});

//Extra.=====================================2020-2020==============================/

Export.image.toDrive({image: T6.select('SR_B4_median', 'SR_B3_median', 'SR_B2_median'),
  description: 'Veg-L7', 
  folder: 'GEE',
  scale: 30,
  region: Sian_Pol,
  crs: 'EPSG:32616',
  maxPixels: 1e13});

//======================================================14. Visualizar al mapa combinación de color verdadero B(3,2,1).=========================/ ========================/

var rgb_vis = {
  bands: ['SR_B3', 'SR_B2', 'SR_B1'],
  min: 0.0,
  max: 0.2,
}; 

//===== ==========================15. Añadir capas de categorízación de los valores de NDVI por año,=========================================================/
//=================================adaptado para este estudio.===================================================================/

//=================================15.1.Añadir al mapa los valores de las anualidades para cada zona (ZN-ZS) de estudio en la RBSK==========================/

Map.addLayer (NDVImultitemporal.clip(ee.FeatureCollection(zonas)), {max: 1, min: 0, gamma: 1.4,}, 'NDVI multitemporal Zonas');
Map.addLayer (SAVImultitemporal.clip(ee.FeatureCollection(zonas)), {max: 1, min: 0, gamma: 1.4,}, 'SAVI multitemporal Zonas');

Map.addLayer (NDVI1,{max: 1.0, min: 0, palette: palette}, 'NDVI_2011');
Map.addLayer (SAVI1,{max: 1.0, min: 0, palette: palette}, 'SAVI_2011');

//====================================15.2.Añadir al mapa la representación de la mediana de la imagen y perimetro del área de estudio.==========================/

Map.addLayer (ZN, {color:'blue'}, 'ZN');
Map.addLayer (ZS, {color:'cyan'}, 'ZS');

//======================================16.Centrar el mapa en el archivo vectorial de la RBSK (Perimetro).==================================================/
Map.centerObject (Sian_Per, 10);
