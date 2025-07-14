import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar el dataset CSV
# NOTA: Cambia la ruta si mueves el archivo
csv_path = '../../proyecto_final_python.py'

df = pd.read_csv(csv_path)

# Limpieza rápida: renombrar columnas si tienen espacios, etc.
df.columns = [col.strip().replace(' ', '_').lower() for col in df.columns]

# Resumen general de datos
print('Primeras filas:')
print(df.head())
print('\nResumen estadístico:')
print(df.describe(include='all'))

# Ventas totales por categoría
ventas_categoria = df.groupby('category')['price'].sum().sort_values(ascending=False)
print('\nVentas totales por categoría:')
print(ventas_categoria)

# Visualización: ventas por categoría
plt.figure(figsize=(8,4))
sns.barplot(x=ventas_categoria.index, y=ventas_categoria.values, palette='viridis')
plt.title('Ventas totales por categoría')
plt.ylabel('Total ventas')
plt.xlabel('Categoría')
plt.xticks(rotation=30)
plt.tight_layout()
plt.savefig('img/ventas_por_categoria.png')
plt.close()

# Ventas por centro comercial
ventas_mall = df.groupby('shopping_mall')['price'].sum().sort_values(ascending=False)[:8]
plt.figure(figsize=(8,4))
sns.barplot(x=ventas_mall.index, y=ventas_mall.values, palette='mako')
plt.title('Top 8 Centros Comerciales por Ventas')
plt.ylabel('Total ventas')
plt.xlabel('Centro Comercial')
plt.xticks(rotation=30)
plt.tight_layout()
plt.savefig('img/ventas_por_mall.png')
plt.close()

# Distribución de precios
plt.figure(figsize=(7,3))
sns.histplot(df['price'], bins=30, kde=True, color='skyblue')
plt.title('Distribución de precios de venta')
plt.xlabel('Precio')
plt.tight_layout()
plt.savefig('img/distribucion_precios.png')
plt.close()

print('\n¡Análisis y gráficas generadas en la carpeta img/!')
