import os
import csv
import json
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

from PIL import Image, ExifTags

from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

data_dir = 'detect'

img_height = 128
img_width = 128
batch_size = 32
num_classes = 10

train_ds = image_dataset_from_directory(
    data_dir,
    validation_split = 0.2,
    subset = "training",
    seed = 123,
    image_size = (img_height, img_width),
    batch_size = batch_size
)

val_ds = image_dataset_from_directory(
    data_dir,
    validation_split = 0.2,
    subset = "validation",
    seed = 123,
    image_size = (img_height, img_width),
    batch_size = batch_size
)

normalization_layer = tf.keras.layers.Rescaling(1./255)
train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

model = Sequential([
    tf.keras.layers.InputLayer(input_shape=(128, 128, 3)),
    Conv2D(32, (3, 3), activation = 'relu', input_shape = (img_height, img_width, 3)),
    MaxPooling2D(pool_size = (2, 2)),
    Conv2D(64, (3, 3), activation = 'relu'),
    MaxPooling2D(pool_size = (2, 2)),
    Conv2D(128, (3, 3), activation = 'relu'),
    MaxPooling2D(pool_size = (2, 2)),
    Flatten(),
    Dense(128, activation = 'relu'),
    Dropout(0.5),
    Dense(num_classes, activation = 'softmax')
    
])

model.compile(optimizer = Adam(), loss = 'sparse_categorical_crossentropy', metrics = ['accuracy'])

epochs = 20
history = model.fit(train_ds, validation_data = val_ds, epochs = epochs)

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(epochs)
plt.figure(figsize = (12, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label = 'Training Accuracy')
plt.plot(epochs_range, val_acc, label = 'Validation Accuracy')
plt.legend(loc = 'lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label = 'Training Loss')
plt.plot(epochs_range, val_loss, label = 'Validation Loss')
plt.legend(loc = 'upper right')
plt.title('Training and Validation Loss')
plt.show()

model.save('animal_classification_model/animal_classification_model.h5')
model = tf.keras.models.load_model('animal_classification_model/animal_classification_model.h5')

model_json = model.to_json()
with open("models/model.json","w") as json_file:
    json_file.write(model_json)

metadata = {
    "model_name": "Animal Classification Model",
    "version": "1.0",
    "description": "Computing Technology Innovation Project",
    "author": "cos30049",
    "date_created": "2024-11-06",
    "input_shape": [None, 224, 224, 3],
    "output_shape": [None, 10]
}

with open('models/metadata.json', 'w') as json_file:
    json.dump(metadata, json_file, indent = 4)

weights = model.get_weights()
with open('models/weight.bin', 'wb') as f:
    for weight in weights:
        np.save(f, weight)

class_names = [
    'bearded pig',
    'leopard cat',
    'long tailed macaque',
    'malayan civet',
    'marbled cat',
    'munjact',
    'pig tailed macaque',
    'sambar deer',
    'sun bear',
    'yellow throated marten'
]

def predict_image(img_path):
    img = image.load_img(img_path, target_size = (128, 128))
    img_array = image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    img_array /= 255.0

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    predicted_class = class_names[np.argmax(score)]
    confidence = 100 * np.max(score)

    return predicted_class, confidence

def predict_folder_to_csv(folder_path, output_csv_path):
    with open(output_csv_path, mode = 'w', newline = '', encoding = 'utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['side_name', 'image_name', 'predicted_animal', 'date_taken', 'time_taken', 'day_night', 'confidence_%'])

        for subfolder in os.listdir(folder_path):
            subfolder_path = os.path.join(folder_path, subfolder)
            if os.path.isdir(subfolder_path):
                for filename in os.listdir(subfolder_path):
                    if filename.lower().endswith(('.jpg','.png','.jpeg')):
                        img_path = os.path.join(subfolder_path, filename)

                        image = Image.open(img_path)
                        exif_data = image._getexif()

                        predicted_class, date_time, date_taken, time_taken, confidence = "Null", "Null", "Null", "Null", 0
                        if exif_data is not None:
                            predicted_class, confidence = predict_image(img_path)
                            for tag, value in exif_data.items():
                                tag_name = ExifTags.TAGS.get(tag, tag)
                                if tag_name == "DateTimeOriginal":
                                    date_time = value
                                    date_taken, time_taken = date_time.split(' ')

                                    hours, minute, second = time_taken.split(':')
                                    hours = int(hours)
                                    day_night = 'day' if hours < 18 else 'night'
                                    break

                        writer.writerow([subfolder, filename, predicted_class, date_taken, time_taken, day_night, f"{confidence:.2f}"])
                        print(f"Side Name:\t{subfolder}\nFile Name:\t{filename}\nType:\t\t{predicted_class.capitalize()}\nDate Taken:\t{date_time}\nConfidence:\t{confidence:.2f}%\n\n")

folder_path = 'result'
output_csv_path = 'result/result.csv'
predict_folder_to_csv(folder_path, output_csv_path)