# NDVI-SAVI-Anual-DCA
Estimación NDVI-SAVI para el periodo 2011-2020 en la RBSK

# Desarrollo de código y obtención de información para su posterior análisis.

## Descripción 📋
El presente código esta desarrollado para obtener Índices de Vegetación Multiespectral (IVM) de Índice de Diferenbcia Normalizada (NDVI) e Índice de Vegetación Ajustado al Suelo (SAVI), dentro de la plataforma Google Earth Engine para la Reserva de la Bisofera de Sian Ka´an (RBSK), Quintana Roo, México. Éste se compone de dos secciones, una donde se estiman los valores de NDVI y SAVI de forma anual ppara el periodo 2011-2020 y la segunda para exportar las capas raster anuales con valores estimados de los IVM. Además de estadisticos descriptivos por zona e IVM, Histogramas de los valores de los IVM por zona de estudio, así como las superficie de cada área estudiada, entre otros datos. información que puede ser descargada para su manejo externo. [**GEE**](https://developers.google.com/earth-engine/guides/getstarted?hl=en).

El repostirorio se elaboró de acuerdo a los lineamientos de la [**licencia GNU General Public License v3.0.**](https://choosealicense.com/licenses/gpl-3.0/).

##Visualización de la Reserva de la Bisofera de Sian Ka´an (RBSK), a tráves de la colección 2 de Landsat 7, con composición de bandas B (3, 2, 1) y B ( 4, 3, 2), en GEE.

![alt text](https://github.com/demostenesmx/NDVI-SAVI_DCA/blob/main/C02_B_3_2_1_RBSK.JPG);  ![alt text](https://github.com/demostenesmx/NDVI-SAVI_DCA/blob/main/Veg%20(B_4-3-2).jpeg) 📖

Estimaciones.

Resultados de Histogramas de la distribución de los valores anuales de los IVM estimados por zona (ZN-ZS) para el periodo 2011-2020. 

1. ![alt text](https://github.com/demostenesmx/NDVI-SAVI-Anual-DCA/blob/main/NDVI_ZN_Anual.png)

2. ![alt text](https://github.com/demostenesmx/NDVI-SAVI-Anual-DCA/blob/main/SAVI_ZN_Anual.png)

3. ![alt text](https://github.com/demostenesmx/NDVI-SAVI-Anual-DCA/blob/main/NDVI_ZS_Anual.png)

4. ![alt text](https://github.com/demostenesmx/NDVI-SAVI-Anual-DCA/blob/main/SAVI_ZS_Anual.png)

### Capas raster anuales a exportar. 
Las capas raster de exportación se ubicaran dentro de la pestaña Tasks, para su descarga en google drive y posteriormente ser descargadas a la PC personal para su manipulación. Este código fue elaborado mendiante la plataforma GEE. Se puede acceder a través del siguiente link: https://code.earthengine.google.com/?accept_repo=users/veronica78mere/DCA_Tesis

![alt text](https://github.com/demostenesmx/NDVI-SAVI-Anual-DCA/blob/main/Raster_Anuales_Descarga.JPG)

La manipulación de la información contenida en los rasaters puede realizarse, a traves, del sistema de información geografica de su preferencia. Para el presente caso de estudio se utilizó el software de acceso libre QGIS.

![alt text](https://github.com/demostenesmx/NDVI-SAVI_DCA/blob/main/QGis.JPG)
