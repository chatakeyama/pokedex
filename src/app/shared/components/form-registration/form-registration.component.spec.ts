import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormRegistrationComponent } from './form-registration.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class ToastrServiceStub { }

describe('FormRegistrationComponent', () => {
  let component: FormRegistrationComponent;
  let fixture: ComponentFixture<FormRegistrationComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRegistrationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistrationComponent);
    component = fixture.componentInstance;
    fixture.debugElement.nativeElement.style.visibility = "hidden";
    fixture.detectChanges();
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have \'Editar\' in title when editing', () => {
    route = TestBed.inject(ActivatedRoute);
    route.snapshot.params['id'] = 1
    component.ngOnInit()
    expect(component.title).toContain('Editar')
  });

  it('Should have \'Cadastrar\' in title when adding', () => {
    route = TestBed.inject(ActivatedRoute);
    route.snapshot.params['id'] = ''
    component.ngOnInit()
    expect(component.title).toContain('Cadastrar')
  });

  it('Name field should be invalid when its length is shorter than 2', () => {
    const nomeControl = component.nome
    nomeControl?.setValue('c')
    fixture.detectChanges();
    expect(nomeControl?.status).toEqual('INVALID')
  });

  it('Categoria field should be required ', () => {
    const categoriaControl = component.categoria
    categoriaControl?.setValue('')
    fixture.detectChanges();
    expect(categoriaControl?.status).toEqual('INVALID')
  });

  it('Should call goToListPage() when adding a pokémon', () => {
    let spy = spyOn(component, 'goToListPage');
    component.create()
    expect(spy).toHaveBeenCalled();
  });


});
