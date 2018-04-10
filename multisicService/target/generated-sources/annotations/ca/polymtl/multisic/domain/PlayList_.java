package ca.polymtl.multisic.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(PlayList.class)
public abstract class PlayList_ {

	public static volatile SingularAttribute<PlayList, String> name;
	public static volatile SingularAttribute<PlayList, Long> id;
	public static volatile SetAttribute<PlayList, Track> tracks;

}

