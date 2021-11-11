struct A;

typedef struct {
  void (*Init)(struct A *, int a);
  int (*Foo)(struct A *);
} A_functable;

typedef struct A {
  int x, y;
  A_functable *vmt;
} A;

void A_Init(A *this, int a);
int A_Foo(A *this);

A_functable A_vmt = {A_Init, A_Foo};

void A_Init(A *this, int a) {
  this->vmt = &A_vmt;
  this->x = a - 1;
  this->y = 2 * a;
}

int A_Foo(A *this) {
  int s;
  s = this->x * this->y;
  return s;
}

struct Main;

typedef struct {
  void (*main)(struct Main *);
} Main_functable;

typedef struct Main {
  A *obj;
  Main_functable *vmt;
} Main;

void Main_main(Main *this);

Main_functable Main_vmt = {Main_main};

void Main_main(Main *this) {
  // we need to create A by mallocing
  A *_tmp_A_0 = malloc(sizeof(A));
  _tmp_A_0->vmt->Init(_tmp_A_0, 9);
  A *_tmp_A_1 = malloc(sizeof(A));
  printf("%d\n", _tmp_A_1->vmt->Foo(_tmp_A_1));
  // clearly A does not live beyond this scope.
  // maybe we don't know, but the compiler will know by counting reference etc.
  // free it.
}
