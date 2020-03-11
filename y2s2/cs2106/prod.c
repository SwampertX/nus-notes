// producer
#include <semaphore.h>
#include <pthread.h>

#define K 100

pthread_mutex_t *mutex1, *mutex2;
sem_t *notFull, *notEmpty;

int main() {
  // initialize notFull to Semaphore(k)
  sem_init(notFull, 0, K);
  // while notEmpty to Semaphore(0)
  sem_init(notEmpty, 0, 0);

  pthread_mutex_init(mutex1, NULL);
  pthread_mutex_init(mutex2, NULL);
}
